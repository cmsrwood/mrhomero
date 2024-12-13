const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
    constructor(message = 'Bad request') {
        super(400, message);
    }
}

class NotFoundError extends HttpError {
    constructor(message = 'Not found') {
        super(404, message);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
};