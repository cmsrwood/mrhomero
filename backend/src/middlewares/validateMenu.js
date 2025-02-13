const { BadRequestError } = require('../errors/ExceptionErrors');

const validateMenu = (req, res, next) => {
    const { categoria, foto } = req.body;

    const err = [];
    if (!categoria) {
        err.push('Falta paramétro: cat_nom');
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