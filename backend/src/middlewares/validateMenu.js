const validateMenu = (req, res, next) => {
    const { nombre, foto } = req.body;
    if (!nombre || !foto) return res.status(400).json({ message: 'Categoria y foto son requeridas' })
    if (nombre.trim().length === 0 || foto.trim().length === 0) return res.status(400).json({ message: 'Los campos no pueden estar vacios' })
    next();
}


module.exports = { validateMenu }