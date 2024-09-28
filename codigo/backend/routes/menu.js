const express = require('express');
const router = express.Router();
const menuController = require('../controllers/admin/menuController');

// Controladores de categorias para menu
router.get('/mostrarCategorias', menuController.mostrarCategorias);
router.get ('/mostrarCategoria/:id', menuController.mostrarCategoria);
router.post('/crearCategoria', menuController.upload, menuController.crearCategoria);
router.put('/actualizarCategoria/:id', menuController.upload, menuController.actualizarCategoria);
router.delete('/eliminarCategoria/:id', menuController.eliminarCategoria);

module.exports = router