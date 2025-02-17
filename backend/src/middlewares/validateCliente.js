const { BadRequestError } = require('../errors/ExceptionErrors');

const validateCliente = (req, res, next) => {

    const { user_nom, user_apels, user_tel } = req.body;

    const err = [];
    if (!user_nom) {
        err.push('Falta paramétro: user_nom');
    }

    if (!user_apels) {
        err.push('Falta paramétro: user_apels');
    }

    if (!user_tel) {
        err.push('Falta paramétro: user_tel');
    }

    if (err.length > 0) {
        throw new BadRequestError(err.join(' '));
    }
    next();
};
module.exports = {
    validateCliente
};