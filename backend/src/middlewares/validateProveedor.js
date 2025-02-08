const { BadRequestError } = require('../errors/ExceptionErrors');

const validateProveedor = (req, res, next) => {
    const { empresa, direccion, encargado, telefono, correo } = req.body;

    const err = [];

    if (!empresa) {
        err.push('Falta paramétro: empresa');
    }

    if (!direccion) {
        err.push('Falta paramétro: direccion');
    }

    if (!encargado) {
        err.push('Falta paramétro: encargado');
    }

    if (!telefono) {
        err.push('Falta paramétro: telefono');
    }

    if (isNaN(telefono)) {
        err.push('El paramétro telefono debe ser un número');
    }

    if (!correo) {
        err.push('Falta paramétro: correo');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}

module.exports = { validateProveedor }