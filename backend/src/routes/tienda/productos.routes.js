const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');
const { validateProducto } = require('../../middlewares/validateProducto');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestionar productos
 */

//Get

/**
 * @swagger
 * /tienda/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de Productos obtenida exitosamente
 */
router.get('/', productosController.mostrarProductos);

/**
 * @swagger
 * /tienda/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 */
router.get('/:id', productosController.mostrarProducto);

/**
 * @swagger
 * /tienda/productos/categoria/{id}:
 *   get:
 *     summary: Obtener todos los productos de una categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 * */
router.get('/categoria/:id', productosController.mostrarProductosPorcategoria);

//Post

/**
 * @swagger
 * /tienda/productos/crear:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "producto_id"
 *               nombre:
 *                 type: string
 *                 example: "Coca-Cola"
 *               descripcion:
 *                 type: string
 *                 example: "Bebida de cola"
 *               precio:
 *                 type: number
 *                 example: 1000
 *               foto:
 *                 type: string
 *                 example: "http://imagen.jpg"
 *               puntos:
 *                 type: number
 *                 example: 100
 *               categoria_id:
 *                 type: string
 *                 example: categoria_id
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - categoria_id
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error interno del servidor
 * */
router.post('/crear', validateProducto, productosController.crearProducto);

//Put

/**
 * @swagger
 * /tienda/productos/actualizar/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "producto_id"
 *               nombre:
 *                 type: string
 *                 example: "Coca-Cola"
 *               descripcion:
 *                 type: string
 *                 example: "Bebida de cola"
 *               precio:
 *                 type: number
 *                 example: 1000
 *               foto:
 *                 type: string
 *                 example: "http://imagen.jpg"
 *               puntos:
 *                 type: number
 *                 example: 100
 *               categoria_id:
 *                 type: string
 *                 example: categoria_id
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - categoria_id
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 * */
router.put('/actualizar/:id', productosController.actualizarProducto);

/**
 * @swagger
 * /tienda/productos/restaurar/{id}:
 *   put:
 *     summary: Restaurar un producto deshabilitado
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto restaurado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.put('/restaurar/:id', productosController.restaurarProducto);

/**
 * @swagger
 * /tienda/productos/eliminar/{id}:
 *   put:
 *     summary: Deshabilitar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto restaurado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.put('/eliminar/:id', productosController.eliminarProducto);

module.exports = router;