const menuServices = require('../services/menuServices');

// Mostrar una categoría
exports.mostrarCategorias = async (req, res) => {
    try {
        const categorias = await menuServices.mostrarCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo categorías' });
    }
};

// Mostrar una categoría
exports.mostrarCategoria = async (req, res) => {
    try {
        const response = await menuServices.mostrarCategoria(req.params.id);
        res.status(200).json(response);
    } catch {
        res.status(500).send({ error: 'Error obteniendo categoría' });
    }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const response = await menuServices.crearCategoria(req.body.categoria, req.body.foto);
        res.status(response.status || 200).send(response.error);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error creando categoría' });
    }
};


// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    try {
        const response = await menuServices.actualizarCategoria(req.params.id, req.body.foto, req.body.categoria);
        res.status(response.status || 200).send(response.error);
    } catch {
        console.log(error);
        res.status(500).send({ error: 'Error actualizando categoría' });
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    try {
        const response = await menuServices.eliminarCategoria(req.params.id);
        res.status(200).json(response);
    } catch {
        res.status(500).send({ error: 'Error eliminando categoría' });
    }
};