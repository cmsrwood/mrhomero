const empServices = require('../services/empleadosServices');

// Mostrar todos los empleado
exports.mostrarEmpleados = async (req, res, next) => {
    try {
        const response = await empServices.mostrarEmpleados();
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// Mostrar un solo empleado
exports.mostrarEmpleado = async (req, res, next) => {
    try {
        const response = await empServices.mostrarEmpleado(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Actualizar empleado
exports.actualizarEmpleado = async (req, res, next) => {
    try {
        const empleado = req.body;
        const response = await empServices.actualizarEmpleado(empleado);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Borrar empleado
exports.borrarEmpleado = async (req, res, next) => {
    try {
        const idEmpleado = req.params.id
        const response = await empServices.borrarEmpleado(idEmpleado);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Mostrar las horas de un empleado
exports.MostrarHorasEmpleadoMes = async (req, res, next) => {
    try {
        const mes = req.params.mes;
        const ano = req.params.ano;
        const id = req.params.id;
        const response = await empServices.MostrarHorasEmpleadoMes(mes, ano, id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// Mostrar la hora de inicio de un empleado
exports.horaInicio = async (req, res, next) => {
    try {
        const idEmpleado = req.params.id;
        const horaInicio = req.body.hora_inicio;
        const fecha = req.body.fecha;
        const response = await empServices.horaInicio(idEmpleado, fecha, horaInicio);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Mostrar la hora de salida de un empleado
exports.horaFin = async (req, res, next) => {
    try {
        const idEmpleado = req.params.id;
        const horaFin = req.body.hora_fin;
        const fecha = req.body.fecha;
        const response = await empServices.horaFin(idEmpleado, fecha, horaFin);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}


exports.horasDia = async (req, res, next) => {
    try {
        const idEmpleado = req.params.id;
        const fecha = req.params.fecha;
        const response = await empServices.horasDia(idEmpleado, fecha);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Horas trabajadas por mes de un empleado
exports.horasPorMes = async (req, res, next) => {
    try {
        const idEmpleado = req.params.id;
        const mes = req.params.mes;
        const ano = req.params.ano;
        const response = await empServices.horasPorMes(idEmpleado, mes, ano);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

