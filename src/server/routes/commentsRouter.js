import { Router } from 'express';
import { userCommentService } from '../services';

const commentsRouter = Router();
commentsRouter.get('/', async (req, res) => {
    try {
        const comments = await userCommentService.getAllComments()
        res.json(comments);

    } catch (e) {
        console.log(e);
    }
});

export { commentsRouter };