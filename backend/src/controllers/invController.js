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
        const producto = await invServices.mostrarProductoInventario(req.params.id);
        res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

// Controlador para crear un producto en el inventario
exports.crearInventario = async (req, res, next) => {
    try {
        const response = await invServices.crearInventario(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error creando ingrediente' });
    }
};

// Controlador para actualizar un producto en el inventario
exports.actualizarInventario = async (req, res, next) => {
    try {
        const response = await invServices.actualizarInventario(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para borrar un producto en el inventario
exports.borrarProductoInventario = async (req, res, next) => {
    try {
        const response = await invServices.borrarProductoInventario(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar las categorias
exports.mostrarCategorias = async (req, res, next) => {
    try {
        const response = await invServices.mostrarCategorias();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar los proveedores
exports.mostrarProveedores = async (req, res, next) => {
    try {
        const response = await invServices.mostrarProveedores();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}