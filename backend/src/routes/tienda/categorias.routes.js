const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menuController');
const { validateMenu } = require('../../middlewares/validateMenu');

// Controladores de categorias para menu
router.get('/', menuController.mostrarCategorias);
router.get('/:id', menuController.mostrarCategoria);

router.post('/crear', validateMenu, menuController.crearCategoria);

router.put('/actualizar/:id', validateMenu, menuController.actualizarCategoria);

router.delete('/borrar/:id', menuController.borrarCategoria);

module.exports = router