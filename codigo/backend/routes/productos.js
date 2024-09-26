const express = require('express');
const router = express.Router();
const productosController = require('../controllers/admin/productosController');

//Controladores para cada categoria

router.get('/mostrarProductos/:id', productosController.mostrarProductos);
router.post('/crearProducto', productosController.uploadProductos, productosController.crearProducto);
router.put('/actualizarProducto/:id', productosController.actualizarProducto);
router.delete('/borrarProducto/:id', productosController.borrarProducto);


module.exports = router 