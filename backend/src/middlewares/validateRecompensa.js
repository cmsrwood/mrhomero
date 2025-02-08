const { BadRequestError } = require('../errors/ExceptionErrors');

const validateRecompensa = (req, res, next) => {
    const { nombre, puntos, foto } = req.body;

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
    if (!foto) {
        err.push('Falta paramétro: foto');
    }
    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}
module.exports = validateRecompensa;