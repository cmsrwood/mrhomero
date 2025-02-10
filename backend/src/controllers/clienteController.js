const clientesServices = require('../services/clientesServices')

// Controlador para mostrar un solo cliente
exports.mostrarCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await clientesServices.mostrarCliente(id);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }

};

//Controlador para mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const response = await clientesServices.mostrarClientes();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

//Controlador para mostrar los clientes del ultimo mes
exports.mostrarCuentaClientesUltimoMes = async (req, res,next) => {
    try {
        const response = await clientesServices.mostrarClientesUltimoMes();
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
};



// Controlador para agregar puntos
exports.agregarPuntos = async (req, res, next) => {
    try {
        const id = req.params.id;
        const puntos = req.body.user_puntos;
        const response = await clientesServices.agregarPuntos(id, puntos);
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

// Controlador para actualizar un cliente
exports.actualizarCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cliente = req.body;
        const response = await clientesServices.actualizarCliente(id, cliente);
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

// Controlador para eliminar un cliente
exports.eliminarCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await clientesServices.eliminarCliente(id);
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

// Controlador para restaurar un cliente
exports.restaurarCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await clientesServices.restaurarCliente(id);
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};