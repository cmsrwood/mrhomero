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

class ExistNameCategoriaError extends HttpError{
    constructor(message = 'La categoria ya existe') {
        super(400, message);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    ExistNameCategoriaError
};