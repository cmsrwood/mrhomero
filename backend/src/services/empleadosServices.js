const empRepository = require('../repositories/empleadosRepository');
const { NotFoundError } = require('../errors/ExceptionErrors');

// Servicios para mostrar empleados
exports.mostrarEmpleados = async () => {
    const response = await empRepository.mostrarEmpleados();
    return response;
}

// Servicio para mostrar un solo empleado
exports.mostrarEmpleado = async (id) => {
    const response = await empRepository.mostrarEmpleado(id);
    if (response.length <= 0) throw new NotFoundError('El empleado no existe');
    return response;
}

// Servicio para actualizar un empleado
exports.actualizarEmpleado = async (empleado) => {
    const empleadoEmail = await empRepository.traerUsuarioPorEmail(empleado.email);
    if (empleadoEmail.length <= 0) throw new NotFoundError('Usuario no encontrado. Debe estar registrado en el sistema');

    const response = await empRepository.actualizarEmpleado(empleado);
    return response
}

// Servicio para eliminar un empleado
exports.borrarEmpleado = async (id) => {
    const empleado = await empRepository.mostrarEmpleado(id);
    if (empleado.length <= 0) throw new NotFoundError('El empleado no existe');
    const response = await empRepository.borrarEmpleado(id);
    return response;
}

// Servicios para mostrar las horas de un empleado
exports.MostrarHorasEmpleadoMes = async (mes, ano, id) => {
    const empleado = await empRepository.mostrarEmpleado(id);
    if (empleado.length <= 0) throw new NotFoundError('El empleado no existe');
    const response = await empRepository.MostrarHorasEmpleadoMes(mes, ano, id);
    if (response.length <= 0) throw new NotFoundError('El empleado no tiene horas registradas');
    return response;
}

// Servicios para mostrar las horas de un empleado
exports.horaInicio = async (id, fecha, hora) => {
    const response = await empRepository.horaInicio(id, fecha, hora);
    return response;
}

// Servicios para mostrar la hora de salida de un empleado
exports.horaFin = async (id, fecha, horaFin) => {
    const response = await empRepository.horaFin(id, fecha, horaFin);
    return response;
}

// servicio para ver las hora por dia de un empleado
exports.horaDia = async (id, fecha) => {
    const response = await empRepository.horaDia(id, fecha);
    return response;
}

// Servicio para mostrar las horas trabajadaspor mes de un empleado
exports.horasPorMes = async (id, mes, ano) => { 
    const response = await empRepository.horasPorMes(id, mes, ano);
    return response;
}