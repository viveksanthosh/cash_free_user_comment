import { nSQL } from "@nano-sql/core";

class UserCommentRepository {
    constructor() {

    }

    initilizeTables() {
        const dbList = nSQL().listDatabases();
        if (dbList.length === 0)
            nSQL().createDatabase({
                id: "my_db",
                tables: [
                    {
                        name: "users",
                        model: {
                            "user_id:int": { pk: true, ai: true },
                            "name:string": {},
                        }
                    }, {
                        name: "comments",
                        model: {
                            "comment:string": {},
                            "user_id:int": {},
                            "reply_to_comment_id:int": {},
                            "reply_to_user:int": {},
                            "comment_id:int": { pk: true, ai: true },
                        }
                    }
                ],
            }).then(async () => {
                await nSQL("users")
                    .query("upsert", [{ name: "vivek" },
                    { name: "ram" },
                    { name: "praveen" },
                    { name: "mohan" },
                    ]).exec()
                await nSQL("comments")
                    .query("upsert", [
                        { user_id: 1, comment: 'This is awesome' },
                        { user_id: 2, comment: 'Great job' },
                        { user_id: 3, comment: 'Updating the content would be good' },

                        { user_id: 4, comment: 'Thanks a lot', reply_to_comment_id: 1 },
                        { user_id: 4, comment: 'Watch this space', reply_to_comment_id: 3 },
                        { user_id: 1, comment: 'I agree', reply_to_comment_id: 3 },
                        { user_id: 3, comment: 'Will do', reply_to_comment_id: 3, reply_to_user: 4 },
                    ]).exec()
                //let users = await nSQL("users").query("select").exec()
                //let comments = await nSQL("comments").query("select").exec()
                //console.log({ users, comments });

            })
    }

    getComments() {
        return nSQL('comments')
        .query('select', [
            'comments.comment_id as comment_id',
            'comments.comment as comment',
            'comments.user_id as user_id',
            'comment_users.name as user_name',
            'comments.reply_to_comment_id as reply_to_comment_id',
            'reply_users.name as reply_to_user_name',
            'comments.reply_to_user as reply_to_user_id',

        ])
        .join([{
            type: "inner",
            with: { table: "users", as: "comment_users" },
            on: ["comments.user_id", "=", "comment_users.user_id"]
        }, {
            type: "left",
            with: { table: "users", as: "reply_users" },
            on: [`reply_users.user_id`, '=', `comments.reply_to_user`]
        }])
        .where(['comments.reply_to_comment_id', '=', 'NULL'])
        .exec()
        .then(d => {
            //console.log(d);
            return Object.values(d.reduce((acc, e) => {
                console.log(e);
                if (!e.reply_to_comment_id) {
                    acc[e.comment_id] = e;
                    acc[e.comment_id]['replies'] = []
                } else {
                    acc[e.reply_to_comment_id]['replies'].push({
                        comment_id: e.comment_id, 
                        comment: e.comment, 
                        reply_to_user_name: e.reply_to_user_name, 
                        reply_to_user_id: e.reply_to_user_id
                    })

                }
                return acc
            }, {}))
        })
    }

}

export { UserCommentRepository }