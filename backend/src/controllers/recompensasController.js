const recompensasServices = require('../services/recompensasServices');

// Controlador para mostrar todas las recompensas
exports.mostrarRecompensas = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensas();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar una recompensa
exports.mostrarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensa(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar recompensas obtenidas
exports.mostrarRecompensasObtenidas = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensasObtenidas();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar recompensas obtenidas por usuario
exports.mostrarRecompensasObtenidasPorUsuario = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensasObtenidasPorUsuario(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para mostrar puntos por usuario
exports.mostrarPuntos = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarPuntos(req.params.id);
        res.status(200).json(response);
    }
    catch (error) {
        next(error)
    }
}

// Controlador para crear una nueva recompensa
exports.crearRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.crearRecompensa(req.body)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Controlador para actualizar una recompensa
exports.actualizarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.actualizarRecompensa(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para eliminar una recompensa
exports.eliminarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.eliminarRecompensa(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para reclamar una recompensa
exports.reclamarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.reclamarRecompensa(req.body.id_recompensa, req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para validar recompensa
exports.validarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.validarRecompensa(req.params.id, req.body.codigo);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}