const { BadRequestError } = require('../errors/ExceptionErrors');

const validateRecompensa = (req, res, next) => {
    const { nombre, puntos, descripcion } = req.body;

    const err = [];
    if (!nombre) {
        err.push('Falta paramétro: nombre');
    }
    if (!puntos) {
        err.push('Falta paramétro: puntos');
    }
    if (isNaN(puntos)) {
        err.push('El paramétro puntos debe ser un número');
    }
    if (!descripcion) {
        err.push('Falta paramétro: descripcion');
    }
    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}
module.exports = validateRecompensa;