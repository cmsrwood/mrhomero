const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/ventasController');
const { validarAno, validarAnoMes, validarId, validarVenta } = require('../../middlewares/validateVentas');


router.get('/', ventasController.mostrarVentas);
router.get('/:id', validarId, ventasController.mostrarCompras);
router.get('/detalle/:id', validarId, ventasController.mostrarDetalleVenta);
router.get('/ProductosMasVendidos/:ano/:mes', validarAno, validarAnoMes, ventasController.mostrarProductosMasVendidos);
router.get('/ProductosMasCompradosPorCliente/:id', validarId, ventasController.mostrarProductosMasCompradosPorCliente);
router.get('/CuentaProductosVendidosPorMes/:ano/:mes', validarAno, validarAnoMes, ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/VentasMensuales/:ano/:mes', validarAno, validarAnoMes, ventasController.ventasMensuales);
router.get('/VentasPorMes/:ano/:mes', validarAno, validarAnoMes, ventasController.cantidadPrecioVentas);
router.get('/crearReporte/:ano/:mes', validarAno, validarAnoMes, ventasController.generarPDFVentasMensuales);
router.get('/crearReporte/:ano', validarAno, ventasController.generarPDFVentasAnuales);

router.post('/crear', validarVenta, ventasController.crearVenta)
router.post('/crearDetalleVenta', ventasController.crearDetalleVenta);

router.put('/borrar/:id', validarId, ventasController.borrarVenta);
router.put('/restaurar/:id', validarId, ventasController.restaurarVenta);

module.exports = router