const { BadRequestError } = require('../errors/ExceptionErrors');

const validateInventario = (req, res, next) => {
    const { nombre, id_categoria, fecha_ingreso, fecha_caducidad, cantidad, cantidad_min, id_proveedor } = req.body;

    const err = [];

    if (!nombre) {
        err.push('Falta parámetro: nombre');
    }

    if (!id_categoria) {
        err.push('Falta parámetro: id_categoria');
    }

    if (isNaN(id_categoria)) {
        err.push('El parámetro id_categoria debe ser un numero');
    }

    if (id_categoria <= 0) {
        err.push('El parámetro id_categoria debe ser mayor a 0');
    }

    if (!fecha_ingreso) {
        err.push('Falta parámetro: fecha_ingreso');
    }

    if (!fecha_caducidad) {
        err.push('Falta parámetro: fecha_caducidad');
    }

    if (!cantidad) {
        err.push('Falta parámetro: cantidad');
    }

    if (!cantidad_min) {
        err.push('Falta parámetro: cantidad_min');
    }

    if (!id_proveedor) {
        err.push('Falta parámetro: id_proveedor');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }
}

module.exports = { validateInventario }