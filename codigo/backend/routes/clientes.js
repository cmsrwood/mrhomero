const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/admin/clienteController');

// Controladores de autenticación
router.get('/mostrar', clienteController.mostrarClientes);
router.get ('/mostrarCuentaClientesUltimoMes', clienteController.mostrarCuentaClientesUltimoMes);
router.put('/borrar/:id', clienteController.borrarCliente);
router.put('/restaurar/:id', clienteController.restaurarCliente);


module.exports = router