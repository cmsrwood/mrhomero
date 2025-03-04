const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
require('dotenv').config();
const axios = require("axios");
const clientesRepository = require('../repositories/clientesRepository');

// Servicio para mostrar clientes
exports.mostrarClientes = async () => {
    const response = await clientesRepository.mostrarClientes();
    if (response.length <= 0) throw new NotFoundError('No se encontraron clientes');
    return response
}

// Servicio para mostrar cliente por id
exports.mostrarCliente = async (id) => {
    const response = await clientesRepository.mostrarCliente(id);
    if (response.length <= 0) throw new NotFoundError("El cliente no existe");
    return response
}

exports.mostrarClientePorEmail = async (email) => {
    const response = await clientesRepository.mostrarClientePorEmail(email);
    if (response.length <= 0) throw new NotFoundError("El cliente no existe");
    return response
}

exports.mostrarRatingResenas = async () => {
    const placeId = "ChIJsb9BY9eZP44Rp7AWW4MXxH4";
    return await clientesRepository.mostrarRatingResenas(placeId);
}

exports.mostrarResenas = async () => {
    const placeId = "ChIJsb9BY9eZP44Rp7AWW4MXxH4";
    return await clientesRepository.mostrarResenas(placeId);
};

// Servicio para mostrar clientes del ultimo mes
exports.cuentaClientesUltimoMes = async () => {
    const response = await clientesRepository.cuentaClientesUltimoMes();
    return response
}

// Servicio para actualizar el cliente
exports.actualizarCliente = async (id, cliente) => {
    const existe = await this.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await clientesRepository.actualizarCliente(id, cliente);
    return response
}

// Servicio para eliminar cliente
exports.eliminarCliente = async (id) => {
    const existe = await this.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await clientesRepository.eliminarCliente(id);
    return response
}

// Servicio para restaurar cliente
exports.restaurarCliente = async (id) => {
    const existe = await this.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await clientesRepository.restaurarCliente(id);
    return response
}

// Servicio para agregarpuntos 
exports.agregarPuntos = async (id, puntos) => {
    const existe = await this.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await clientesRepository.agregarPuntos(id, puntos)
    return response
}