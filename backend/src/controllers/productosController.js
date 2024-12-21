const productosServices = require('../services/productosServices');

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await productosServices.mostrarProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error)
    }
};

// Mostrar todos los productos por categoria

exports.mostrarProductosPorcategoria = async (req, res, next) => {
    try {
        const response = await productosServices.mostrarProductosPorCategoria(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Mostrar un solo producto
exports.mostrarProducto = async (req, res, next) => {
    try {
        const response = await productosServices.mostrarProducto(req.params.id);
        res.status(200).json(response);
        console.log(response)
    } catch (error) {
        next(error)
    }
};


// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const response = await productosServices.crearProducto(req.body.nombre, req.body.descripcion, req.body.precio, req.body.foto, req.body.puntos, req.body.id_categoria);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({ error: 'Error creando producto' });
    }


};

// Actualizar una categoría
exports.actualizarProducto = async (req, res, next) => {
    try {
        const response = await productosServices.actualizarProducto(req.params.id, req.body.nombre, req.body.descripcion, req.body.precio, req.body.foto, req.body.puntos);
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
};

// Borrar un producto
exports.borrarProducto = (req, res) => {
    try {
        const response = productosServices.eliminarProducto(req.params.id);
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
};
