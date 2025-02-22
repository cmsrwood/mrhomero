const menuServices = require('../services/menuServices');

// Controlador para mostrar una categoría
exports.mostrarCategorias = async (req, res, next) => {
    try {
        const categorias = await menuServices.mostrarCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        next(error)
    }
};

// Controlador para mostrar una categoría
exports.mostrarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.mostrarCategoria(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Controlador para crear una nueva categoría
exports.crearCategoria = async (req, res, next) => {
    try {
        const categoria = req.body
        const response = await menuServices.crearCategoria(categoria);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};


// Controlador para actualizar una categoría
exports.actualizarCategoria = async (req, res, next) => {
    try {
        const id = req.params.id
        const categoria = req.body
        const response = await menuServices.actualizarCategoria(id, categoria);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

exports.restaurarCategoria = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await menuServices.restaurarCategoria(id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// Controlador para eliminar una categoría
exports.eliminarCategoria = async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await menuServices.eliminarCategoria(id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};