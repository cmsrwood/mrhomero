const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/ventasController');
const { validarAnoMes, validarAno, validarId, validarVenta } = require('../../middlewares/validateVentas');


router.get('/', ventasController.mostrarVentas);
router.get('/:id', ventasController.mostrarVenta);
router.get('/cliente/:id', validarId, ventasController.mostrarCompras);
router.get('/detalle/:id', ventasController.mostrarDetalleVenta);
router.get('/ProductosMasVendidos/:ano/:mes', validarAnoMes, ventasController.mostrarProductosMasVendidos);
router.get('/ProductosMasCompradosPorCliente/:id', validarId, ventasController.mostrarProductosMasCompradosPorCliente);
router.get('/CuentaProductosVendidosPorMes/:ano/:mes', validarAnoMes, ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/VentasMensuales/:ano/:mes', validarAnoMes, ventasController.ventasMensuales);
router.get('/VentasPorMes/:ano/:mes', validarAnoMes, ventasController.cantidadPrecioVentas);
router.get('/crearReporte/:ano/:mes', validarAnoMes, ventasController.generarPDFVentasMensuales);
router.get('/crearReporte/:ano', validarAno, ventasController.generarPDFVentasAnuales);

router.post('/crear', validarVenta, ventasController.crearVenta)
router.post('/crearDetalleVenta', ventasController.crearDetalleVenta);

router.put('/borrar/:id', validarId, ventasController.borrarVenta);
router.put('/restaurar/:id', validarId, ventasController.restaurarVenta);

module.exports = router