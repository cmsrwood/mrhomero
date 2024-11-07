const express = require('express');
const router = express.Router();
const productosController = require('../controllers/admin/productosController');

//Controladores para cada categoria

router.get('/mostrarProductos/:id', productosController.mostrarProductosPorcategoria);
router.get('/mostrarProductos/', productosController.mostrarProductos);
router.get ('/mostrarProducto/:id', productosController.mostrarProducto);
router.post('/crearProducto', productosController.uploadProducto, productosController.crearProducto);
router.put('/actualizarProducto/:id', productosController.uploadProducto, productosController.actualizarProducto);
router.delete('/borrarProducto/:id', productosController.borrarProducto);


module.exports = router 