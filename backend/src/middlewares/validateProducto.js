const { BadRequestError } = require('../errors/ExceptionErrors');

const validateProducto = (req, res, next) => {
    const { nombre, descripcion, precio, foto, puntos, id_categoria } = req.body;
    const err = [];

    if (!nombre) {
        err.push('Falta paramétro: nombre');
    }

    if (!descripcion) {
        err.push('Falta paramétro: descripcion');
    }

    if (!precio) {
        err.push('Falta paramétro: precio');
    }

    if (!puntos) {
        err.push('Falta paramétro: puntos');
    }

    if (!id_categoria) {
        err.push('Falta paramétro: id_categoria');
    }

    if (isNaN(precio)) {
        err.push('El paramétro precio debe ser un número');
    }

    if (isNaN(puntos)) {
        err.push('El paramétro puntos debe ser un número');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}

module.exports = { validateProducto }