const { BadRequestError } = require('../errors/ExceptionErrors');

const validateCliente = (req, res, next) => {

    const { nombre, apellido, telefono } = req.body;

    const err = [];
    if (!nombre) {
        err.push('Falta paramétro: nombre');
    }

    if (!apellido) {
        err.push('Falta paramétro: apellido');
    }

    if (!telefono) {
        err.push('Falta paramétro: telefono');
    }

    if (err.length > 0) {
        throw new BadRequestError(err.join(' '));
    }
    next();
};
module.exports = {
    validateCliente
};