const { BadRequestError } = require('../errors/ExceptionErrors');

const validateAnoMes = (req, res, next) => {

    const err = [];
    const { ano, mes } = req.params;
    if (!ano) {
        err.push('Falta parámetro: ano');
    }

    if (!mes) {
        err.push('Falta parámetro: mes');
    }

    if (mes < 1 || mes > 12) {
        err.push('El parámetro mes debe estar entre 1 y 12');
    }

    if (isNaN(ano)) {
        err.push('El parámetro ano deben ser un numero');
    }

    if (isNaN(mes)) {
        err.push('El parámetro mes deben ser un numero');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
};

const validateAno = (req, res, next) => {

    const err = [];
    const { ano } = req.params;

    if (!ano) {
        err.push('Falta parámetro: ano');
    }

    if (isNaN(ano)) {
        err.push('El parámetro ano deben ser un numero');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
};

const validateIdVenta = (req, res, next) => {
    const err = [];
    const { id } = req.params;

    if (!id) {
        err.push('Falta parámetro: id_venta');
    }

    if (id <= 0) {
        err.push('El parámetro id_venta debe ser mayor a 0');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
}

const validateVenta = (req, res, next) => {
    const { venta_fecha, venta_metodo_pago, venta_total } = req.body;

    const err = [];

    if (!venta_fecha) {
        err.push('Falta parámetro: venta_fecha');
    }

    if (!venta_metodo_pago) {
        err.push('Falta parámetro: venta_metodo_pago');
    }

    if (!venta_total) {
        err.push('Falta parámetro: venta_total');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
};

const validateDetalleVenta = (req, res, next) => {
    const { id_venta, id_producto, cantidad, precio_unitario, subtotal } = req.body;

    const err = [];

    if (!id_venta) {
        err.push('Falta parámetro: id_venta');
    }

    if (!id_producto) {
        err.push('Falta parámetro: id_producto');
    }

    if (!cantidad) {
        err.push('Falta parámetro: cantidad');
    }

    if (!precio_unitario) {
        err.push('Falta parámetro: precio_unitario');
    }

    if (!subtotal) {
        err.push('Falta parámetro: subtotal');
    }

    if (isNaN(cantidad)) {
        err.push('El parámetro cantidad debe ser un numero');
    }

    if (isNaN(subtotal)) {
        err.push('El parámetro subtotal debe ser un numero');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }

    next();
}

module.exports = {
    validateAnoMes,
    validateAno,
    validateIdVenta,
    validateVenta,
    validateDetalleVenta
};