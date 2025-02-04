const validarAnoMes = (req, res, next) => {
    const { ano, mes } = req.params;
    if (!ano || !mes) {
        return res.status(400).send({ error: 'Faltan parámetros: ano y mes' });
    }
    next();
};

const validarAno = (req, res, next) => {
    const { ano } = req.params;
    if (!ano) {
        return res.status(400).send({ error: 'Falta parámetro: ano' });
    }
    next();
};

module.exports = {
    validarAnoMes,
    validarAno,
};