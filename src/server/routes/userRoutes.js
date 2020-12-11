import { Router } from 'express';
import { userCommentService } from '../services';

const userRoutes = Router();
userRoutes.get('/getUserComments/:id', async (req, res) => {
    try {
        //const { id } = req.params;
        //const data = await userCommentService.getUserComments(id)
        res.json({ 'a': 1 });

    } catch (e) {
        console.log(e);
    }
});

export { userRoutes };