const express = require('express');
const router = express.Router();
const clientesController = require('../../controllers/clientesController');
const { validateCliente } = require('../../middlewares/validateCliente')

// Get
router.get('/', clientesController.mostrarClientes);
router.get('/:id', clientesController.mostrarCliente);
router.get('/email/:id/', clientesController.mostrarClientePorEmail);
router.get('/reportes/cuentaClientesUltimoMes/', clientesController.cuentaClientesUltimoMes);
router.get('/resenas/datos/rating/', clientesController.mostrarRatingResenas);
router.get('/resenas/datos/', clientesController.mostrarResenas);

// Put
router.put('/agregarPuntos/:id', clientesController.agregarPuntos);
router.put('/eliminar/:id', clientesController.eliminarCliente);
router.put('/restaurar/:id', clientesController.restaurarCliente);
router.put('/actualizar/:id', clientesController.actualizarCliente);


module.exports = router;