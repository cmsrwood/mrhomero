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
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 */
router.get('/:id', productosController.mostrarProducto);
router.get('/categoria/:id', productosController.mostrarProductosPorcategoria);

//Post
router.post('/crear', validateProducto, productosController.crearProducto);

//Put
router.put('/actualizar/:id', productosController.actualizarProducto);
router.put('/restaurar/:id', productosController.restaurarProducto);
router.put('/eliminar/:id', productosController.eliminarProducto);

module.exports = router;