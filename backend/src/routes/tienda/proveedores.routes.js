const express = require('express');
const router = express.Router();
const provController = require('../../controllers/proveedoresController');
const { validateProveedor } = require('../../middlewares/validateProveedor');

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Endpoints para gestionar proveedores
 */

//Get

/**
 * @swagger
 * /tienda/proveedores:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida exitosamente
 */
router.get('/', provController.mostrarProveedores);

//Post

/**
* @swagger
* /tienda/proveedores/crear:
*   post:
*     summary: Crear un proveedor
*     tags: [Proveedores]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               prov_nombre:
*                 type: string
*                 example: "Proveedor A"
*               prov_direccion:
*                 type: string
*                 example: "Calle 123"
*               prov_contacto_nombre:
*                 type: string
*                 example: "1234567890"
*               prov_contacto_telefono:
*                 type: string
*                 example: "1234567890"
*               prov_contacto_email:
*                 type: string
*                 example: "6Qm9v@example.com"
*             required:
*               - prov_nombre
*               - prov_direccion
*               - prov_contacto_nombre
*               - prov_contacto_telefono
*               - prov_contacto_email
*     responses:
*       200:
*         description: Proveedor creado exitosamente
*/
router.post('/crear', validateProveedor, provController.crearProveedor);

//Put

/**
* @swagger
* /tienda/proveedores/actualizar/{id}:
*   put:
*     summary: Actualizar un proveedor
*     tags: [Proveedores]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del proveedor
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               prov_nombre:
*                 type: string
*                 example: "Proveedor A"
*               prov_direccion:
*                 type: string
*                 example: "Calle 123"
*               prov_contacto_nombre:
*                 type: string
*                 example: "1234567890"
*               prov_contacto_telefono:
*                 type: string
*                 example: "1234567890"
*               prov_contacto_email:
*                 type: string
*                 example: "6Qm9v@example.com"
*             required:
*               - prov_nombre
*               - prov_direccion
*               - prov_contacto_nombre
*               - prov_contacto_telefono
*               - prov_contacto_email
*     responses:
*       200:
*         description: Proveedor actualizado exitosamente
*       404:
*         description: Proveedor no encontrado
*       500:
*         description: Error al actualizar el proveedor
*/
router.put('/actualizar/:id', validateProveedor, provController.actualizarProveedor);

//Delete

/**
* @swagger
* /tienda/proveedores/eliminar/{id}:
*   delete:
*     summary: Eliminar un proveedor
*     tags: [Proveedores]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del proveedor
*     responses:
*       200:
*         description: Proveedor eliminado exitosamente
*       404:
*         description: Proveedor no encontrado
*       500:
*         description: Error al eliminar el proveedor
*/
router.delete('/eliminar/:id', provController.eliminarProveedor);

module.exports = router