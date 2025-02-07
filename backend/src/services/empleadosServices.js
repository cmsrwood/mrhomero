const empRepository = require('../repositories/empleadosRepository');
const { NotFoundError } = require('../errors/ExceptionErrors');

exports.mostrarEmpleados = async () => { 
    const response = await  empRepository.mostrarEmpleados();
    return response;
}

exports.mostrarEmpleado = async (id) => { 
    const response = await empRepository.mostrarEmpleado(id);
    if (response.length <= 0) throw new NotFoundError('El empleado no existe');
    return response;
}
