const e = require('cors');
const { BadRequestError } = require('../errors/ExceptionErrors');

const validateEmpleado = (req, res, next) => {
    const err = [];
    const { nombre, apellidos, email, telefono } = req.body;

    if (!nombre) {
        err.push('Falta paramétro: nombre,');
    }

    if (!apellidos) {
        err.push('Falta paramétro: apellido,');
    }

    if (!email) {
        err.push('Falta paramétro: email,');
    }

    if (!telefono) {
        err.push('Falta paramétro: telefono,');
    }

    if (err.length > 0) {
        throw new BadRequestError(err.join('\n'));
    }


    next();
}

module.exports = { validateEmpleado };