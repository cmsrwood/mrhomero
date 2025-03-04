const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menuController');
const { validateMenu } = require('../../middlewares/validateMenu');

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para gestionar categorías
 */

/**
 * @swagger
 * /tienda/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 */
router.get('/', menuController.mostrarCategorias);

/**
 * @swagger
 * /tienda/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Datos de la categoría obtenidos exitosamente
 *       400:
 *         description: Categoría no encontrada
 */

router.get('/:id', menuController.mostrarCategoria);

/**
 * @swagger
 * /tienda/categorias/crear:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Bebidas"
 *               descripcion:
 *                 type: string
 *                 example: "Categoría para todo tipo de bebidas"
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/crear', validateMenu, menuController.crearCategoria);

/**
 * @swagger
 * /tienda/categorias/actualizar/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Bebidas sin alcohol"
 *               descripcion:
 *                 type: string
 *                 example: "Categoría para bebidas sin alcohol"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/actualizar/:id', menuController.actualizarCategoria);

/**
 * @swagger
 * /tienda/categorias/restaurar/{id}:
 *   put:
 *     summary: Restaurar una categoría eliminada
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a restaurar
 *     responses:
 *       200:
 *         description: Categoría restaurada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/restaurar/:id', menuController.restaurarCategoria);

/**
 * @swagger
 * /tienda/categorias/eliminar/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/eliminar/:id', menuController.eliminarCategoria);

module.exports = router;