const validateInventario = (req, res, next) => {
    const { nombre, id_categoria, fecha_ingreso, fecha_caducidad, cantidad, cantidad_min, id_proveedor } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Ingrese el nombre del producto' });
    else if (!id_categoria) return res.status(400).json({ message: 'Seleccione una categoría' });
    else if (!fecha_ingreso) return res.status(400).json({ message: 'Ingrese la fecha de ingreso' });
    else if (!fecha_caducidad) return res.status(400).json({ message: 'Ingrese la fecha de caducidad' });
    else if (!cantidad) return res.status(400).json({ message: 'Ingrese la cantidad' });
    else if (!cantidad_min) return res.status(400).json({ message: 'Ingrese la cantidad mínima' });
    else if (!id_proveedor) return res.status(400).json({ message: 'Seleccione un proveedor' });
    next();
}

module.exports = { validateInventario }