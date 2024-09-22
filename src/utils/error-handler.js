const {StatusCodes} = require('http-status-codes')
class AppErrors extends Error {
    constructor(
        name,
        message="something went wrong",
        explanation="something went wrong",
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super()
        this.message=message,
        this.name=name,
        this.explanation=explanation,
        this.statusCode=statusCode
    }
}

module.exports = AppErrors