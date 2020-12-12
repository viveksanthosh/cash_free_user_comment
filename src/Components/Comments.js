import React, { useEffect, useState } from 'react'
import './Comments.css'

const Comments = ({ selectedUser, onSelectedUserChange }) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch('/api/comments').then(r => {
            if (!r.ok)
                return
            r.json().then(c => {
                setComments(c)
            })
        })
    }, [])

    console.log({ comments });
    return <section className='comments'>
        {comments.map(c => <div key={c.comment_id}>
            <CommentList  {...c} />
        </div>)}
    </section>
}

export { Comments }

const CommentList = ({ comment, user_name, replies = [] }) => {
    return <div>
        <CommentBox comment={comment} user_name={user_name} />
        {replies && replies.map(r => {
            return <CommentBox nested key={r.comment_id} {...r} />
        })}
    </div>
}

const CommentBox = ({ comment, user_name, nested, reply_to_user_name }) => {
    return <div className={`commentBox ${nested ? 'nested' : ''}`}>
        <div>
            <div className='avatar'></div>
            <b className='name'>{user_name}</b>
            <span className='date'>{'Today at 5.50 pm'}</span>
            <p className='comment'>
                {reply_to_user_name && <a onClick={() => {
                    alert('TODO: redirect to users profile')
                }} className='userLink'>@{reply_to_user_name}</a>}
                {comment}</p>
        </div>
        <span className='reply'>Reply</span>
    </div>
}