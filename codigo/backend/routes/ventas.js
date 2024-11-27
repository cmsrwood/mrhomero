const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/admin/ventasController');

router.get('/mostrar', ventasController.mostrarVentas);
router.get('/mostrarCompras/:id', ventasController.mostrarCompras);
router.get('/mostrarDetalleVenta/:id', ventasController.mostrarDetalleVenta);
router.get('/mostrarProductosMasVendidos/:ano/:mes', ventasController.mostrarProductosMasVendidos);
router.get('/mostrarCuentaProductosVendidosPorMes/:ano/:mes', ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/mostrarVentasMensuales/:ano/:mes', ventasController.ventasMensuales);
router.get('/mostrarVentasPorMes/:ano/:mes', ventasController.cantidadPrecioVentas);
router.get('/crearReporte/:ano/:mes', ventasController.generarPDFVentasMensuales);
router.post('/crear', ventasController.crearVenta)
router.post('/crearDetalleVenta', ventasController.crearDetalleVenta);
router.put('/borrar/:id', ventasController.borrarVenta);
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router