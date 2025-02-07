const { ExistNameError, NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const clientesRepository = require('../repositories/clientesRepository');

//Servicio para mostrar clientes
exports.mostrarClientes = async () => {
    return await clientesRepository.mostrarClientes();
}
//mostrar cliente por id
exports.mostrarCliente = async (id) => {
    const response = await clientesRepository.mostrarCliente(id);
    if (response.length <= 0) throw new NotFoundError("El cliente no existe");
    return response
}
//Servicio para actualizar el cliente
exports.actualizarCliente = async (id,cliente)=>{
    const existe = await this.mostrarCliente(id)
    if (existe.length <=0) throw new NotFoundError('El cliente no existe')
    const response = await clientesRepository.actualizarCliente(id,cliente)
    return response
}