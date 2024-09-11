const express = require('express');
const router = express.Router();
const invController = require('../controllers/admin/invController');

router.get('/mostrar', invController.mostrarInventario);

router.post('/crear', invController.crearInventario);

router.delete('/borrar/:id', invController.borrarInventario);

router.put('/actualizar/:id', invController.actualizarInventario);

module.exports = router