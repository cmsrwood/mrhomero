const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clienteController');

router.get('/clientes/', clienteController.mostrarClientes);
router.get('/clientes/:id', clienteController.mostrarClientesByid);
router.get('/clientes/mostrarCuentaClientesUltimoMes', clienteController.mostrarCuentaClientesUltimoMes);
router.put('/clientes/agregarPuntos/:id', clienteController.agregarPuntos);
router.put('/clientes/borrar/:id', clienteController.borrarCliente);
router.put('/clientes/restaurar/:id', clienteController.restaurarCliente);
router.put('/clientes/actualizar/:id', clienteController.upload, clienteController.actualizarCliente);


module.exports = router;