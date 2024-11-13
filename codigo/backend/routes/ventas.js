const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/admin/ventasController');

router.get('/mostrar', ventasController.mostrarVentas);
router.get('/mostrarDetalleVenta/:id', ventasController.mostrarDetalleVenta);
router.get('mostrarProductosMasVendidos', ventasController.mostrarProductosMasVendidos);
router.post('/crear', ventasController.crearVenta);
router.post('/crearDetalleVenta', ventasController.crearDetalleVenta);
router.put('/borrar/:id', ventasController.borrarVenta);
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router