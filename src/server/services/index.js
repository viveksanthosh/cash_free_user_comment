import { UserCommentRepository } from './UserCommentRepository'
import { UserCommentService } from './UserCommentService'


const userCommentRepository = new UserCommentRepository()
const userCommentService = new    UserCommentService(userCommentRepository)
