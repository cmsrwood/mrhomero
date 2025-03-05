const express = require('express');
const router = express.Router();
const recompensasController = require('../../controllers/recompensasController');
const validateRecompensa = require('../../middlewares/validateRecompensa');


/**
 * @swagger
 * tags:
 *   name: Recompensas
 *   description: Endpoints para gestionar las recompensas
 */

/**
 * @swagger
 * /tienda/recompensas:
 *   get:
 *     summary: Obtener todas las recompensas
 *     tags: [Recompensas]
 *     responses:
 *       200:
 *         description: Lista de recompensas obtenida exitosamente
 */
router.get('/', recompensasController.mostrarRecompensas);

/**
 * @swagger
 * /tienda/recompensas/{id}:
 *   get:
 *     summary: Obtener una recompensa por ID
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id_recomp
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recompensa
 *     responses:
 *       200:
 *         description: Datos de la recompensa obtenidos exitosamente
 *       400:
 *         description: Recompensa no encontrada
 */
router.get('/:id', recompensasController.mostrarRecompensa);

/**
 * @swagger
 * /tienda/recompensas/recompensasObtenidas/recompensas:
 *   get:
 *     summary: Obtener todas las recompensas que han sido reclamadas
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id_recomp_obt
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recompensa obtenida
 *     responses:
 *       200:
 *         description: Lista de recompensas obtenida exitosamente
 *       400:
 *         description: Recompensas no encontradas
 */
router.get('/recompensasObtenidas/recompensas', recompensasController.mostrarRecompensasObtenidas);

/**
 * @swagger
 * /tienda/recompensas/recompensasUsuario/{id}:
 *   get:
 *     summary: Obtener las recompensas reclamadas por un usuario
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id_recomp_obt
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recompensa obtenida
 *     responses:
 *       200:
 *         description: Lista de recompensas obtenida exitosamente
 *       400:
 *         description: Recompensas no encontradas
 */
router.get('/recompensasUsuario/:id', recompensasController.mostrarRecompensasObtenidasPorUsuario);

/**
 * @swagger
 * /tienda/recompensas/puntosUsuario/{id}:
 *   get:
 *     summary: Obtener los puntos de un usuario
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id_recomp_obt
 *         required: true
 *         schema:
 *           type: integer
 *         description: Puntos de la recompensa obtenida
 *     responses:
 *       200:
 *         description: Puntos obtenidos exitosamente
 *       400:
 *         description: Puntos no encontrados
 */
router.get('/puntosUsuario/:id', recompensasController.mostrarPuntos);


/**
 * @swagger
 * /tienda/recompensas/crear:
 *   post:
 *     summary: Crear una recompensa
 *     tags: [Recompensas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "recompensa_id"
 *               nombre:
 *                 type: string
 *                 example: "Recompensa 1"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la recompensa 1"
 *               puntos:
 *                 type: number
 *                 example: 100
 *               foto:
 *                 type: string
 *                 example: "http://imagen.jpg"
 *     responses:
 *       200:
 *         description: Recompensa creada con éxito
 *       500:
 *         description: Error en el servidor
 */
router.post('/crear', validateRecompensa, recompensasController.crearRecompensa);

/**
 * @swagger
 * /tienda/recompensas/reclamar/{id}:
 *   post:
 *     summary: Reclamar una recompensa
 *     tags: [Recompensas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_recompensa:
 *                 type: string
 *               id_usuario:
 *                 type: string
 *               codigo:
 *                 type: string
 *                 example: "29745"
 *               fecha_reclamo:
 *                 type: date-time
 *                 example: "2023-08-07T10:30:00Z"
 *     responses:
 *       200:
 *         description: Recompensa reclamada exitosamente
 *       400:
 *         description: Error al reclamar la recompensa
 */
router.post('/reclamar/:id', recompensasController.reclamarRecompensa);

/**
 * @swagger
 * /tienda/recompensas/actualizar/{id}:
 *   put:
 *     summary: Actualizar una recompensa
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recompensa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Vaso con tematica de Homero"
 *               descripcion:
 *                 type: string
 *                 example: "Categoría para bebidas sin alcohol"
 *               puntos:
 *                 type: number
 *                 example: 100
 *               foto:
 *                 type: string
 *                 example: "http://imagen.jpg"
 *     responses:
 *       200:
 *         description: Recompensa actualizada con éxito
 *       404:
 *         description: Error al actualizar la recompensa
 */
router.put('/actualizar/:id', recompensasController.actualizarRecompensa);

/**
 * @swagger
 * /tienda/recompensas/validar/{id}:
 *   put:
 *     summary: validar el codigo de una recompensa
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recompensa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "239857"
 *     responses:
 *       200:
 *         description: Recompensa validada con éxito
 *       400:
 *         description: Error en el servidor
 */
router.put('/validar/:id', recompensasController.validarRecompensa);

/**
 * @swagger
 * /tienda/recompensas/restaurar/{id}:
 *   put:
 *     summary: restaurar una recompensa
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recompensa
 *     responses:
 *       200:
 *         description: Recompensa restaurada con éxito
 *       400:
 *         description: Error en el servidor
 */
router.put('/restaurar/:id', recompensasController.restaurarRecompensa);

/**
 * @swagger
 * /tienda/recompensas/eliminar/{id}:
 *   put:
 *     summary: eliminar una recompensa
 *     tags: [Recompensas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recompensa
 *     responses:
 *       200:
 *         description: Recompensa eliminada con éxito
 *       400:
 *         description: Error en el servidor
 */
router.put('/eliminar/:id', recompensasController.eliminarRecompensa);

module.exports = router