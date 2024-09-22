const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
    constructor(error) {
        let errorName=error.name;
        let explanation;
        Object.keys(error.errors)
        super('not able to validate the data send in the request',explanation,StatusCodes.BAD_REQUEST);
    }
}

module.exports = ValidationError