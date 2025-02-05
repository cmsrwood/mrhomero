const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');
const { validateProducto } = require('../../middlewares/validateProducto');

//Controladores para cada producto
router.get('/', productosController.mostrarProductos);
router.get('/:id', productosController.mostrarProducto);
router.get('/categoria/:id', productosController.mostrarProductosPorcategoria);

router.post('/crear', validateProducto, productosController.crearProducto);

router.put('/actualizar/:id', validateProducto, productosController.actualizarProducto);

router.delete('/borrar/:id', productosController.borrarProducto);

module.exports = router;