import { Router } from 'express';
import { userCommentService } from '../services';

const userRoutes = Router();
userRoutes.get('/', async (req, res) => {
    try {
        const data = await userCommentService.getComments()
        res.json(data);

    } catch (e) {
        console.log(e);
    }
});

export { userRoutes };