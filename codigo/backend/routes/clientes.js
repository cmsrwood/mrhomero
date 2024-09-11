const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/admin/clienteController');

// Controladores de autenticación
router.get('/mostrar', clienteController.mostrarClientes);
router.delete('/borrar/:id', clienteController.borrarCliente);

module.exports = router