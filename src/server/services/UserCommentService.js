class UserCommentService {

    constructor(userCommentRepository) {
        this.userCommentRepository = userCommentRepository
        this.initilizeData()
    }

    getAllComments() {
        return this.userCommentRepository.getAllComments()
    }
    getAllUsers() {
        return this.userCommentRepository.getAllUsers()
    }

    initilizeData(){
        this.userCommentRepository.initilizeTables()
      
    }

}

export { UserCommentService }