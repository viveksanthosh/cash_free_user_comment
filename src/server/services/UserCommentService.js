class UserCommentService {

    constructor(userCommentRepository) {
        this.userCommentRepository = userCommentRepository
        this.initilizeData()
    }

    getComments() {
        return this.userCommentRepository.getComments()
    }

    initilizeData(){
        this.userCommentRepository.initilizeTables()
      
    }

}

export { UserCommentService }