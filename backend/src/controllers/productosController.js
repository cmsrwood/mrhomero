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
        const id = req.params.id
        const response = await productosServices.mostrarProductosPorCategoria(id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar un solo producto
exports.mostrarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await productosServices.mostrarProducto(id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};


// Controlador para crear un nuevo producto
exports.crearProducto = async (req, res, next) => {
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
        const id = req.params.id
        const producto = req.body
        const response = await productosServices.actualizarProducto(id, producto);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

// Controlador para restuarar una categoría
exports.restaurarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await productosServices.restaurarProducto(id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

// Controlador para eliminar un producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await productosServices.eliminarProducto(id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};