const menuServices = require('../services/menuServices');

// Mostrar una categoría
exports.mostrarCategorias = async (req, res, next) => {
    try {
        const categorias = await menuServices.mostrarCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        next(error)
    }
};

// Mostrar una categoría
exports.mostrarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.mostrarCategoria(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.crearCategoria(req.body);
        console.log (response)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
};


// Actualizar una categoría
exports.actualizarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.actualizarCategoria(req.params.id, req.body);
        res.status(204).json(response)
    } catch (error) {
        next(error)
    }
};

// Eliminar una categoría
exports.borrarCategoria = async (req, res, next) => {
    try {
        const response = await menuServices.borrarCategoria(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};