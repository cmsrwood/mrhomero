const recompensasRepository = require('../repositories/recompensasRepository');
const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
// Servicio para ver las recompensas obtenidas
exports.mostrarRecompensasObtenidas = async () => {
    return await recompensasRepository.mostrarRecompensasObtenidas();

}

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


// Servicio para las recompensas obtenidas por usuario
exports.mostrarRecompensasObtenidasPorUsuario = async (id) => {
    const response = await recompensasRepository.mostrarRecompensasObtenidasPorUsuario(id);
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
    if (existe) throw new BadRequestError('La recompensa ya existe');

    return await recompensasRepository.crearRecompensa(recompensa);
}

// Servicio para actualizar una recompensa
exports.actualizarRecompensa = async (id, recompensa) => {
    const existe = await recompensasRepository.mostrarRecompensa(id)
    if (existe == null) throw new NotFoundError('La recompensa no existe');
    const response = await recompensasRepository.actualizarRecompensa(id, recompensa);
    return response;
}

// Servicio para eliminar una recompensa
exports.eliminarRecompensa = async (id) => {
    const existe = await recompensasRepository.mostrarRecompensa(id);
    if (existe == null) throw new NotFoundError('La recompensa no existe');
    const response = await recompensasRepository.eliminarRecompensa(id);
    return response;
}

exports.restaurarRecompensa = async (id) => {
    const existe = await recompensasRepository.mostrarRecompensa(id);
    if (existe == null) throw new NotFoundError('La recompensa no existe');
    const response = await recompensasRepository.restaurarRecompensa(id);
    return response;
}

// Servicio para reclamar una recompensa
exports.reclamarRecompensa = async (id_recompensa, id_usuario) => {
    // Verificar si la recompensa existe
    const recompensa = await recompensasRepository.mostrarRecompensa(id_recompensa);
    if (recompensa == null) throw new NotFoundError('La recompensa no existe');

    // Generar codigo de validación
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await recompensasRepository.insertarRecompensaObtenida(id_recompensa, id_usuario, codigo);

    // Actualizar puntos del usuario
    const puntosRecompensa = recompensa.recomp_num_puntos;
    console.log('Puntos de la recompensa: ' + puntosRecompensa);
    const actualizarPuntos = await recompensasRepository.actualizarPuntos(id_usuario, puntosRecompensa);

    return response;
}

// Servicio para validar una recompensa
exports.validarRecompensa = async (id, codigo) => {
    //Verifica si la recompensa existe
    const recompensa = await recompensasRepository.mostrarRecompensasObtenidasPorId(id);
    if (recompensa <= 0) throw new NotFoundError('La recompensa no existe');

    //Recoge todos los datos de la recompensa
    const datosRecompensa = recompensa[0]
    if (datosRecompensa.codigo !== codigo) throw new NotFoundError('El código no es válido');
    if (datosRecompensa.estado === 0) throw new NotFoundError('La recompensa ya fue validada');
    const response = await recompensasRepository.validarCodigoRecompensa(id, codigo);
    return response;

}