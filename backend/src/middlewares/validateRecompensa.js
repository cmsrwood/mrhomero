const validateRecompensa = (req, res, next) => {
    const { nombre, puntos, foto } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'Falta el nombre' });
    }
    else if (!puntos) {
        return res.status(400).json({ message: 'Faltan los puntos' });
    }
    else if (!foto) {
        return res.status(400).json({ message: 'Falta la foto' });
    }
    if (!nombre || !puntos || !foto) {
        return res.status(400).json({ message: 'Faltan datos' });
    }
    next();
}
module.exports = validateRecompensa;