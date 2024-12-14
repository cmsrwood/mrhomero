const validateMenu = (req, res, next) => {
    const { categoria, foto } = req.body;
    if (!categoria || !foto) return res.status(400).json({ message: 'Categoria y foto son requeridas' })
    if (categoria.trim().length === 0 || foto.trim().length === 0) return res.status(400).json({ message: 'Los campos no pueden estar vacios' })
    next();
}


module.exports = { validateMenu }