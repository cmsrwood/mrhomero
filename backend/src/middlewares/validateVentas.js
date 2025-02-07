const validarAnoMes = (req, res, next) => {
    const { ano, mes } = req.params;
    if (!ano || !mes) {
        return res.status(400).json({ error: 'Faltan parámetros: ano y mes' });
    }

    if (mes < 1 || mes > 12) {
        return res.status(400).json({ error: 'El parámetro mes debe estar entre 1 y 12' });
    }

    if (isNaN(ano) || isNaN(mes)) {
        return res.status(400).json({ error: 'Los parámetros ano y mes deben ser numeros' });
    }
    next();
};

const validarAno = (req, res, next) => {
    const { ano } = req.params;
    if (!ano) {
        return res.status(400).json({ error: 'Falta parámetro: ano' });
    }

    if (isNaN(ano)) {
        return res.status(400).json({ error: 'El parámetro ano debe ser un numero' });
    }
    
    next();
};

const validarId = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Falta parámetro: id' });
    }

    if (id <= 0) {
        return res.status(400).json({ error: 'El parámetro id debe ser mayor a 0' });
    }

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El parámetro id debe ser un numero' });
    }

    next();
};

const validarVenta = (req, res, next) => {
    const { venta_fecha, id_user, venta_metodo_pago, venta_total } = req.body;

    const err = [];

    if (!venta_fecha) {
        messages.push('Falta parámetro: venta_fecha');
    }

    if (!id_user) {
        messages.push('Falta parámetro: id_user');
    }

    if (!venta_metodo_pago) {
        messages.push('Falta parámetro: venta_metodo_pago');
    }

    if (!venta_total) {
        messages.push('Falta parámetro: venta_total');
    }

    if (err.length > 0) {
        return res.status(400).json({ error: err });
    }

    next();
};

module.exports = {
    validarAnoMes,
    validarAno,
    validarId,
    validarVenta
};