class UserCommentService {

    constructor(userCommentRepository) {
        this.userCommentRepository = userCommentRepository
        this.initilizeData()
    }

    getAllComments() {
        return this.userCommentRepository.getAllComments()
    }

    insertUserCommnet(payload) {
        return this.userCommentRepository.insertUserCommnet(payload)
    }

    getAllUsers() {
        return this.userCommentRepository.getAllUsers()
    }

    initilizeData(){
        this.userCommentRepository.initilizeTables()
    }

}

export { UserCommentService }