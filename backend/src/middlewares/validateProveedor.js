const { BadRequestError } = require('../errors/ExceptionErrors');

const validateProveedor = (req, res, next) => {
    const { prov_nombre, prov_direccion, prov_contacto_nombre, prov_contacto_telefono, prov_contacto_email } = req.body;

    const err = [];

    if (!prov_nombre) {
        err.push('Falta paramétro: prov_nombre');
    }

    if (!prov_direccion) {
        err.push('Falta paramétro: prov_direccion');
    }

    if (!prov_contacto_nombre) {
        err.push('Falta paramétro: prov_contacto_nombre');
    }

    if (!prov_contacto_telefono) {
        err.push('Falta paramétro: prov_contacto_telefono');
    }

    if (isNaN(prov_contacto_telefono)) {
        err.push('El paramétro telefono debe ser un número');
    }

    if (!prov_contacto_email) {
        err.push('Falta paramétro: prov_contacto_email');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}

module.exports = { validateProveedor }