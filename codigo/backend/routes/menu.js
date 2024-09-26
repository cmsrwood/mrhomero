const express = require('express');
const router = express.Router();
const menuController = require('../controllers/admin/menuController');

router.get('/mostrarCategorias', menuController.mostrarCategorias);
router.post('/crearCategoria', menuController.upload, menuController.crearCategoria);
router.put ('/actualizarCategoria/:id', menuController.upload, menuController.actualizarCategoria);
router.delete('/eliminarCategoria/:id', menuController.eliminarCategoria);

module.exports = router 