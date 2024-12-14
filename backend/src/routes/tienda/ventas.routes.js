const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/ventasController');

router.get('/', ventasController.mostrarVentas);
router.get('/:id', ventasController.mostrarCompras);
router.get('/detalle/:id', ventasController.mostrarDetalleVenta);
router.get('/ProductosMasVendidos/:ano/:mes', ventasController.mostrarProductosMasVendidos);
router.get('/ProductosMasCompradosPorCliente/:id', ventasController.mostrarProductosMasCompradosPorCliente);
router.get('/CuentaProductosVendidosPorMes/:ano/:mes', ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/VentasMensuales/:ano/:mes', ventasController.ventasMensuales);
router.get('/VentasPorMes/:ano/:mes', ventasController.cantidadPrecioVentas);
router.get('/crearReporte/:ano/:mes', ventasController.generarPDFVentasMensuales);
router.get('/crearReporte/:ano', ventasController.generarPDFVentasAnuales);

router.post('/crear', ventasController.crearVenta)
router.post('/crearDetalleVenta', ventasController.crearDetalleVenta);

router.put('/borrar/:id', ventasController.borrarVenta);
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router