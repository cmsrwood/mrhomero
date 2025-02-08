const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/ventasController');
const { validateAnoMes, validateAno, validateIdVenta, validateVenta, validateDetalleVenta } = require('../../middlewares/validateVentas');
const { validateId } = require('../../middlewares/validateGeneral');

// Rutas para ventas

// Get
router.get('/', ventasController.mostrarVentas);
router.get('/:id', validateIdVenta, ventasController.mostrarVenta);
router.get('/cliente/:id', validateId, ventasController.mostrarCompras);
router.get('/detalle/:id', ventasController.mostrarDetalleVenta);
router.get('/productosMasVendidos/:ano/:mes', validateAnoMes, ventasController.mostrarProductosMasVendidos);
router.get('/productosMasCompradosPorCliente/:id', validateId, ventasController.mostrarProductosMasCompradosPorCliente);
router.get('/cuentaProductosVendidosPorMes/:ano/:mes', validateAnoMes, ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/ventasAnuales/:ano/:mes', validateAnoMes, ventasController.ventasAnuales);
router.get('/ventasMensuales/:ano/:mes', validateAnoMes, ventasController.ventasMensuales);
router.get('/reporte/:ano/:mes', validateAnoMes, ventasController.generarPDFVentasMensuales);
router.get('/reporte/:ano', validateAno, ventasController.generarPDFVentasAnuales);

// Post
router.post('/crear', validateVenta, ventasController.crearVenta)
router.post('/crearDetalleVenta', validateDetalleVenta, ventasController.crearDetalleVenta);

// Put
router.put('/borrar/:id', ventasController.borrarVenta);
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router