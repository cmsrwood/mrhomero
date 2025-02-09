const productosServices = require('../services/productosServices');

// Controlador para mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await productosServices.mostrarProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar todos los productos por categoria
exports.mostrarProductosPorcategoria = async (req, res, next) => {
    try {
        const response = await productosServices.mostrarProductosPorCategoria(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar un solo producto
exports.mostrarProducto = async (req, res, next) => {
    try {
        const response = await productosServices.mostrarProducto(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};


// Controlador para crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = req.body
        const response = await productosServices.crearProducto(producto);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

// Controlador para actualizar una categoría
exports.actualizarProducto = async (req, res, next) => {
    try {
        const response = await productosServices.actualizarProducto(req.params.id, req.body);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

// Controlador para eliminar un producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        const response = await productosServices.eliminarProducto(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};
