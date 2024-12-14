const validateProducto = (req, res, next) =>{
    const {nombre, descripcion, precio, foto, puntos, id_categoria} = req.body;
    if(!nombre) return res.status(400).json({ message: 'Ingrese el nombre del producto' });
    else if(!descripcion) return res.status(400).json({ message: 'Ingrese la descripción del producto' });
    else if(!precio) return res.status(400).json({ message: 'Ingrese la cantidad de puntos' });
    else if(!foto) return res.status(400).json({ message: 'Inserte una imagen' });
    else if(!puntos) return res.status(400).json({ message: 'Ingrese la cantidad de puntos' });
    else if(!id_categoria) return res.status(400).json({ message: 'Seleccione una categoría' });
    next();
}

module.exports = {validateProducto}