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
        const response = await menuServices.crearCategoria(req.body);
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};


// Controlador para actualizar una categoría
exports.actualizarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.actualizarCategoria(req.params.id, req.body);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

// Controlador para eliminar una categoría
exports.eliminarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.eliminarCategoria(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};