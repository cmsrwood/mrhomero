const { BadRequestError } = require('../errors/ExceptionErrors');

const validateInventario = (req, res, next) => {
    const { inv_nombre, categoria_inv_nom, inv_fecha_ing, inv_fecha_cad, inv_cantidad, inv_cantidad_min, id_proveedor } = req.body;

    const err = [];

    if (!inv_nombre) {
        err.push('Falta parámetro: inv_nombre');
    }

    if (!categoria_inv_nom) {
        err.push('Falta parámetro: categoria_inv_nom');
    }

    if (!inv_fecha_ing) {
        err.push('Falta parámetro: inv_fecha_ing');
    }

    if (!inv_fecha_cad) {
        err.push('Falta parámetro: inv_fecha_cad');
    }

    if (!inv_cantidad) {
        err.push('Falta parámetro: inv_cantidad');
    }

    if (!inv_cantidad_min) {
        err.push('Falta parámetro: inv_cantidad_min');
    }

    if (!id_proveedor) {
        err.push('Falta parámetro: id_proveedor');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
}

module.exports = { validateInventario }