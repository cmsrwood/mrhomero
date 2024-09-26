const express = require('express');
const router = express.Router();
const menuController = require('../controllers/admin/menuController');

// Controladores de categorias para menu
router.get('/mostrarCategorias', menuController.mostrarCategorias);
router.post('/crearCategoria', menuController.upload, menuController.crearCategoria);
router.put ('/actualizarCategoria/:id', menuController.upload, menuController.actualizarCategoria);
router.delete('/eliminarCategoria/:id', menuController.eliminarCategoria);

//Controladores para cada categoria

router.get ('/mostrarProductos/:id', menuController.mostrarProductos);
router.post('/crearProducto', menuController.crearProducto);
router.put ('/actualizarProducto/:id', menuController.actualizarProducto);
router.delete('/borrarProducto/:id', menuController.borrarProducto);


module.exports = router 