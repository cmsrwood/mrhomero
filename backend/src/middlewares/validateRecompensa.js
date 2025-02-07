const validateRecompensa = (req, res, next) => {
    const { nombre, puntos, foto } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'Falta rellenar el nombre' });
    }
    else if (!puntos) {
        return res.status(400).json({ message: 'Faltan rellenar los puntos' });
    }
    else if (!foto) {
        return res.status(400).json({ message: 'Falta adjuntar una foto' });
    }
    next();
}
module.exports = validateRecompensa;