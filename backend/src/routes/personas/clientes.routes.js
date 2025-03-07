const express = require('express');
const router = express.Router();
const clientesController = require('../../controllers/clientesController');
const { validateCliente } = require('../../middlewares/validateCliente')

// Get

/**
 * @swagger
 * /personas/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 */

/**
 * @swagger
 * /personas/clientes/:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 */
router.get('/', clientesController.mostrarClientes);

/**
 * @swagger
 * /personas/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Datos del cliente obtenidos exitosamente
 */
router.get('/:id', clientesController.mostrarCliente);

/**
 * @swagger
 * /personas/clientes/email/{id}:
 *   get:
 *     summary: Obtener un cliente por email
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del cliente
 *     responses:
 *       200:
 *         description: Datos del cliente obtenidos exitosamente
 */
router.get('/email/:id/', clientesController.mostrarClientePorEmail);

/**
 * @swagger
 * /personas/clientes/reportes/cuentaClientesUltimoMes:
 *   get:
 *     summary: Obtener la cantidad de clientes registrados en el ultimo mes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 */
router.get('/reportes/cuentaClientesUltimoMes/', clientesController.cuentaClientesUltimoMes);

/**
 * @swagger
 * /personas/clientes/resenas/datos:
 *   get:
 *     summary: Obtener las resenas de los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 */
router.get('/resenas/datos/', clientesController.mostrarResenas);

/**
 * @swagger
 * /personas/clientes/resenas/datos/rating:
 *   get:
 *     summary: Obtener el rating general de los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 * */
router.get('/resenas/datos/rating/', clientesController.mostrarRatingResenas);

// Put

/**
 * @swagger
 * /personas/clientes/agregarPuntos/{id}:
 *   put:
 *     summary: Agregar puntos a un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puntos:
 *                 type: integer
 *                 description: Puntos a agregar
 *     responses:
 *       200:
 *         description: Puntos agregados exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/agregarPuntos/:id', clientesController.agregarPuntos);

/**
 * @swagger
 * /personas/clientes/eliminar/{id}:
 *   put:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/eliminar/:id', clientesController.eliminarCliente);

/**
 * @swagger
 * /personas/clientes/restaurar/{id}:
 *   put:
 *     summary: Restaurar un cliente deshabilitado
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente restaurado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/restaurar/:id', clientesController.restaurarCliente);

/**
 * @swagger
 * /personas/clientes/actualizar/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_nom:
 *                 type: string
 *                 example: "John"
 *               user_apels:
 *                 type: string
 *                 example: "Smith"
 *               user_tel:
 *                 type: string
 *                 example: "1234567890"
 *               foto:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:     
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/actualizar/:id', clientesController.actualizarCliente);

module.exports = router;