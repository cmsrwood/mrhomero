const { BadRequestError } = require('../errors/ExceptionErrors');

const validateId = (req, res, next) => {

    const err = [];
    const { id } = req.params;

    if (!id) {
        err.push('Falta parámetro: id');
    }

    if (id <= 0) {
        err.push('El parámetro id debe ser mayor a 0');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
};

module.exports = {
    validateId
};