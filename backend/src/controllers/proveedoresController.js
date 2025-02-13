const proveedoresServices = require('../services/proveedoresServices');

// Controlador para mostrar los proveedores
exports.mostrarProveedores = async (req, res, next) => {
    try {
        const response = await proveedoresServices.mostrarProveedores();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para crear un proveedor
exports.crearProveedor = async (req, res, next) => {
    try {
        const response = await proveedoresServices.crearProveedor(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para actualizar un proveedor
exports.actualizarProveedor = async (req, res, next) => {
    try {
        const response = await proveedoresServices.actualizarProveedor(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para eliminar un proveedor
exports.eliminarProveedor = async (req, res, next) => {
    try {
        const response = await proveedoresServices.eliminarProveedor(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}