const validateProveedor = (req, res, next) => { 
    const { empresa, direccion, encargado, telefono, correo } = req.body;
    if (!empresa) return res.status(400).json({ message: 'Ingrese el nombre de la empresa' });
    else if (!direccion) return res.status(400).json({ message: 'Ingrese la dirección de la empresa' });
    else if (!encargado) return res.status(400).json({ message: 'Ingrese el nombre del encargado' });
    else if (!telefono) return res.status(400).json({ message: 'Ingrese el teléfono de contacto' });
    else if (!correo) return res.status(400).json({ message: 'Ingrese el correo de contacto' });
    next();
}

module.exports = { validateProveedor }