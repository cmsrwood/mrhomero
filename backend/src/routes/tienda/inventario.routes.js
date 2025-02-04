const express = require('express');
const router = express.Router();
const invController = require('../../controllers/invController');
const { validateInventario } = require('../../middlewares/validateInv');

// Controlador para el inventario
router.get('/', invController.mostrarInventario);
router.get('/categorias', invController.mostrarCategorias);
router.get('/proveedores', invController.mostrarProveedores);

router.post('/crear', validateInventario, invController.crearInventario);

router.put('/actualizar/:id', invController.actualizarInventario);

router.delete('/borrar/:id', invController.borrarInventario);

module.exports = router