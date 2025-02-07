const validateCliente = (req, res, next) => {

    const { nombre, apellido, telefono } = req.body;

    const err = [];
    if (!nombre) {
        err.push('Falta parámetro: nombre');
    }

    if (!apellido) {
        err.push('Falta parámetro: apellido');
    }

    if (!telefono) {
        err.push('Falta parámetro: telefono');
    }

    if (err.length > 0) {
        return res.status(400).json({ error: err });
    }
    next();
};
module.exports = {
    validateCliente
};