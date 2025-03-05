const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/ventasController');
const { validateAnoMes, validateAno, validateIdVenta, validateVenta, validateDetalleVenta } = require('../../middlewares/validateVentas');
const { validateId } = require('../../middlewares/validateGeneral');

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Endpoints para gestionar las recompensas
 */

/**
 * @swagger
 * /tienda/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 */
router.get('/', ventasController.mostrarVentas);

/**
 * @swagger
 * /tienda/ventas/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta obtenida exitosamente
 */
router.get('/:id', validateIdVenta, ventasController.mostrarVenta);

/**
 * @swagger
 * /tienda/ventas/cliente/{id}:
 *   get:
 *     summary: Obtener todas las ventas de un cliente
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Ventas obtenidas exitosamente
 *       400:
 *         description: Cliente no encontrado
 */
router.get('/cliente/:id', ventasController.mostrarCompras);

/**
 * @swagger
 * /tienda/ventas/detalle/{id}:
 *   get:
 *     summary: Obtener el detalle de una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Detalle de la venta obtenido exitosamente
 *       400:
 *         description: Detalle de la venta no encontrado
 */
router.get('/detalle/:id', ventasController.mostrarDetalleVenta);

/**
 * @swagger
 * /tienda/ventas/productosMasVendidos/{ano}/{mes}:
 *   get:
 *     summary: Obtener los productos más vendidos en un mes
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: Productos más vendidos obtenidos exitosamente
 */
router.get('/productosMasVendidos/:ano/:mes', validateAnoMes, ventasController.mostrarProductosMasVendidos);


/**
 * @swagger
 * /tienda/ventas/productosMasCompradosPorCliente/{id}:
 *   get:
 *     summary: Obtener los productos más comprados por un cliente
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Productos más comprados obtenidos exitosamente
 */
router.get('/productosMasCompradosPorCliente/:id', ventasController.mostrarProductosMasCompradosPorCliente);

/**
 * @swagger
 * /tienda/ventas/cuentaProductosVendidosPorMes/{ano}/{mes}:
 *   get:
 *     summary: Obtener la cuenta de productos vendidos por mes
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: Cuenta de productos vendidos obtenida exitosamente
 */
router.get('/cuentaProductosVendidosPorMes/:ano/:mes', validateAnoMes, ventasController.mostrarCuentaProductosVendidosPorMes);

/**
 * @swagger
 * /tienda/ventas/cuentaVentasMes/{ano}/{mes}:
 *   get:
 *     summary: Obtener la cuenta de ventas por mes
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: Cuenta de ventas obtenida exitosamente
 */
router.get('/cuentaVentasMes/:ano/:mes', validateAnoMes, ventasController.cuentaVentasMes);

/**
 * @swagger
 * /tienda/ventas/ventasMensuales/{ano}/{mes}:
 *   get:
 *     summary: Obtener ventas del mes
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: Ventas obtenidas exitosamente
 */
router.get('/ventasMensuales/:ano/:mes', validateAnoMes, ventasController.ventasMensuales);

/**
 * @swagger
 * /tienda/ventas/reporte/{ano}/{mes}:
 *   get:
 *     summary: Generar PDF de ventas mensuales
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 */
router.get('/reporte/:ano/:mes', validateAnoMes, ventasController.generarPDFVentasMensuales);

/**
 * @swagger
 * /tienda/ventas/reporte/{ano}:
 *   get:
 *     summary: Generar PDF de ventas anuales
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 */
router.get('/reporte/:ano', validateAno, ventasController.generarPDFVentasAnuales);

/**
 * @swagger
 * /tienda/ventas/reporteIA/{ano}:
 *   get:
 *     summary: Reporte generado por IA de ventas anuales
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 */
router.get('/reporteIA/:ano', validateAno, ventasController.reporteAnualIA);

/**
 * @swagger
 * /tienda/ventas/reporteIA/{ano}/{mes}:
 *   get:
 *     summary: Reporte generado por IA de ventas mensuales
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: string
 *         description: Mes
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 */
router.get('/reporteIA/:ano/:mes', validateAnoMes, ventasController.reporteMensualIA);

// Post

/**
 * @swagger
 * /tienda/ventas/crear:
 *   post:
 *     summary: Crear una venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               venta_fecha:
 *                 type: string
 *                 example: "2023-01-01"
 *               venta_metodo_pago:
 *                 type: string
 *                 example: "efectivo"
 *               venta_total:
 *                 type: number
 *                 example: 1000
 *               id_user:
 *                 type: string
 *                 example: "usuario_id"
 *     responses:
 *       200:
 *         description: Venta creada exitosamente
 *       404:
 *         description: El cliente no existe
 */
router.post('/crear', validateVenta, ventasController.crearVenta)

/**
 * @swagger
 * /tienda/ventas/crearDetalleVenta:
 *   post:
 *     summary: Crear un detalle de venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               id_venta:
 *                 type: string
 *                 example: "venta_id"
 *               id_producto:
 *                 type: string
 *                 example: "producto_id"
 *               cantidad:
 *                 type: number
 *                 example: 1
 *               precio_unitario:
 *                 type: number
 *                 example: 1000
 *               subtotal:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Detalle de venta creado exitosamente
 *       404:
 *         description: La venta o el producto no existen
 * */
router.post('/crearDetalleVenta', validateDetalleVenta, ventasController.crearDetalleVenta);

// Put

/**
 * @swagger
 * /tienda/ventas/eliminar/{id}:
 *   put:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 */
router.put('/eliminar/:id', ventasController.eliminarVenta);

/**
 * @swagger
 * /tienda/ventas/restaurar/{id}:
 *   put:
 *     summary: Restaurar una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta restaurada exitosamente
 *       404:
 *         description: Venta no encontrada
 */
router.put('/restaurar/:id', ventasController.restaurarVenta);

module.exports = router