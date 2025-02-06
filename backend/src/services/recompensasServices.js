const recompensasRepository = require('../repositories/recompensasRepository');
const { NotFoundError, ExistNameError } = require('../errors/ExceptionErrors');

// Servicio para ver todas las recompensas
exports.mostrarRecompensas = async () => {
    return await recompensasRepository.mostrarRecompensas();
}

// Servicio para ver una recompensa
exports.mostrarRecompensa = async (id) => {
    const response = await recompensasRepository.mostrarRecompensa(id);
    if (response <= 0) throw new NotFoundError('La recompensa no existe');
    return response;
}

// Servicio para ver las recompensas obtenidas
exports.mostrarRecompensasObtenidas = async () => {
    const response = await recompensasRepository.mostrarRecompensasObtenidas();
    if (response.lenght <= 0) throw new NotFoundError('No se ha obtenido ninguna recompensa');
    return response;
}

// Servicio para las recompensas obtenidas por usuario
exports.mostrarRecompensasObtenidasPorUsuario = async (id) => {
    const response = await recompensasRepository.mostrarRecompensasObtenidasPorUsuario(id);
    if (response.length <= 0) throw new NotFoundError('Este usuario no ha reclamado ninguna recompensa');
    return response;
}

// Servicio para ver los puntos por usuario
exports.mostrarPuntos = async (id) => {
    const response = await recompensasRepository.mostrarPuntos(id);
    return response;
}

// Servicio para crear una recompensa
exports.crearRecompensa = async (recompensa) => {
    const existe = await recompensasRepository.verificarNombre(recompensa.nombre);
    if (existe) throw new ExistNameError('La recompensa ya existe');

    return await recompensasRepository.crearRecompensa(recompensa);
}

// Servicio para actualizar una recompensa
exports.actualizarRecompensa = async (id, recompensa) => { 
    const existe = await recompensasRepository.mostrarRecompensa(id)
    if (existe <= 0) throw new NotFoundError('La recompensa no existe');
    const response = await recompensasRepository.actualizarRecompensa(id, recompensa);
    return response;
}

// Servicio para eliminar una recompensa
exports.eliminarRecompensa = async (id) => { 
    const existe = await recompensasRepository.mostrarRecompensa(id);
    if (existe <= 0) throw new NotFoundError('La recompensa no existe');
    const response = await recompensasRepository.eliminarRecompensa(id);
    return response;
}