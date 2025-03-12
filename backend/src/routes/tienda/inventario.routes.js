const express = require('express');
const router = express.Router();
const invController = require('../../controllers/invController');
const { validateInventario } = require('../../middlewares/validateInv');
const { validate } = require('uuid');



/**
 * @swagger
 * tags:
 *   name: Inventario
 *   description: Endpoints para gestionar el inventario
 */

/**
 * @swagger
 * /tienda/inventario:
 *   get:
 *     summary: Obtener todos los productos del inventario
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 */
router.get('/', invController.mostrarInventario);

/**
 * @swagger
 * /tienda/inventario/{id}:
 *  get:
 *     summary: Obtener un producto del inventario por el ID
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id_producto_inv
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Datos del producto obtenidos exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', invController.mostrarProductoInventario);

/**
 * @swagger
 * /tienda/inventario/proveedores/mostrar:
 *  get:
 *     summary: Obtener el proveedor de un producto del inventario por el ID
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id_proveedor
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor del producto
 *     responses:
 *       200:
 *         description: Datos del proveedor del producto obtenidos exitosamente
 *       404:
 *         description: Proveedor no encontrada
 */
router.get('/proveedores/mostrar', invController.mostrarProveedores);
/**
 * @swagger
 * /tienda/inventario/categorias/crear:
 *  post:
 *     summary: Crear un producto en el inventario
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id_producto_inv
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto en el inventario
 *     responses:
 *       200:
 *         description: Datos del producto obtenidos exitosamente
 *       404:
 *         description: Producto no encontrada
 */

//Post
router.post('/crear', validateInventario, invController.crearInventario);
/**
 * @swagger
 * /tienda/inventario/actualizar/{id}:
 *  put:
 *     summary: Actualizar un producto del inventario por el ID
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id_producto_inv
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Datos de la categoria del producto actualizados exitosamente
 *       404:
 *         description: Producto no encontrada
 */

//Put
router.put('/actualizar/:id', validateInventario, invController.actualizarInventario);
/**
 * @swagger
 * /tienda/inventario/eliminar/{id}:
 *  delete:
 *     summary: Eliminar un producto del inventario por el ID
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id_producto_inv
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Datos del producto eliminados exitosamente
 *       404:
 *         description: Producto no encontrada
 */

//Delete
router.delete('/eliminar/:id', invController.eliminarProductoInventario);

module.exports = router