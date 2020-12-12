import { Router } from 'express';
import { userCommentService } from '../services';

const usersRouter = Router();
usersRouter.get('/', async (req, res) => {
    try {
        const users = await userCommentService.getAllUsers()
        res.json(users);

    } catch (e) {
        console.log(e);
    }
});

export { usersRouter };