import { Router } from 'express';
import { userRoutes } from './userRoutes'
const apiRouter = Router();


apiRouter.use('/user-comments', userRoutes)

export { apiRouter }; 