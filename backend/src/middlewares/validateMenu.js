const { BadRequestError } = require('../errors/ExceptionErrors');

const validateMenu = (req, res, next) => {
    const { nombre, foto } = req.body;

    const err = [];
    if (!nombre) {
        err.push('Falta paramétro: nombre');
    }
    if (!foto) {
        err.push('Falta paramétro: foto');
    }
    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
}


module.exports = { validateMenu }