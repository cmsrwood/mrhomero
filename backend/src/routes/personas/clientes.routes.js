const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clienteController');
const { validateCliente } = require('../../middlewares/validateCliente')

router.get('/', clienteController.mostrarClientes);
router.get('/:id', clienteController.mostrarCliente);
router.get('/mostrarCuentaClientesUltimoMes', clienteController.mostrarCuentaClientesUltimoMes);

router.put('/agregarPuntos/:id', clienteController.agregarPuntos);
router.put('/borrar/:id', clienteController.borrarCliente);
router.put('/restaurar/:id', clienteController.restaurarCliente);
router.put('/actualizar/:id',validateCliente, clienteController.actualizarCliente);



module.exports = router;