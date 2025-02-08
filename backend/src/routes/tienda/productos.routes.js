const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');
const { validateProducto } = require('../../middlewares/validateProducto');

//Get
router.get('/', productosController.mostrarProductos);
router.get('/:id', productosController.mostrarProducto);
router.get('/categoria/:id', productosController.mostrarProductosPorcategoria);

//Post
router.post('/crear', validateProducto, productosController.crearProducto);

//Put
router.put('/actualizar/:id', validateProducto, productosController.actualizarProducto);

//Delete
router.delete('/borrar/:id', productosController.borrarProducto);

module.exports = router;