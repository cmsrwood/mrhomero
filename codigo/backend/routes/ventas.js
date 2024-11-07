const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/admin/ventasController');

router.get('/mostrar', ventasController.mostrarVentas);
router.get('/mostrarDetalleVenta/:id', ventasController.mostrarDetalleVenta);
router.post('/crear', ventasController.crearVenta);
router.put('/borrar/:id', ventasController.borrarVenta);
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router