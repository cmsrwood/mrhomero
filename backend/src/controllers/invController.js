const invServices = require('../services/invServices');

// Controlador para mostrar el inventario
exports.mostrarInventario = async (req, res, next) => {
    try {
        const inventario = await invServices.mostrarInventario();
        res.status(200).json(inventario);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar un producto del inventario
exports.mostrarProductoInventario = async (req, res, next) => {
    try {
        const id = req.params.id
        const producto = await invServices.mostrarProductoInventario(id);
        res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar los proveedores
exports.mostrarProveedores = async (req, res, next) => {
    try {
        const response = await invServices.mostrarProveedores();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para crear un producto en el inventario
exports.crearInventario = async (req, res, next) => {
    try {
        const inventario = req.body
        const response = await invServices.crearInventario(inventario);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Controlador para actualizar un producto en el inventario
exports.actualizarInventario = async (req, res, next) => {
    try {
        const id = req.params.id
        const inventario = req.body
        const response = await invServices.actualizarInventario(id, inventario);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para eliminar un producto en el inventario
exports.eliminarProductoInventario = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await invServices.eliminarProductoInventario(id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}