import { Router } from 'express';
import { usersRouter } from './usersRouter'
import { commentsRouter } from './commentsRouter'
const apiRouter = Router();

apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/*', (req, res) => {
    res.status(404).send()
})

export { apiRouter }; 