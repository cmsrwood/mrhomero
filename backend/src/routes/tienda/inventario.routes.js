const express = require('express');
const router = express.Router();
const invController = require('../../controllers/invController');
const { validateInventario } = require('../../middlewares/validateInv');
const { validate } = require('uuid');

//Get
router.get('/', invController.mostrarInventario);
router.get('/:id', invController.mostrarProductoInventario);
router.get('/categorias/mostrar', invController.mostrarCategorias);
router.get('/proveedores/mostrar', invController.mostrarProveedores);

//Post
router.post('/crear', validateInventario, invController.crearInventario);

//Put
router.put('/actualizar/:id', validateInventario, invController.actualizarInventario);

//Delete
router.delete('/eliminar/:id', invController.eliminarProductoInventario);

module.exports = router