const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menuController');
const { validateMenu } = require('../../middlewares/validateMenu');

// Get
router.get('/', menuController.mostrarCategorias);
router.get('/:id', menuController.mostrarCategoria);

// Post
router.post('/crear', validateMenu, menuController.crearCategoria);

// Put
router.put('/actualizar/:id', menuController.actualizarCategoria);

// Delete
router.delete('/eliminar/:id', menuController.eliminarCategoria);

module.exports = router