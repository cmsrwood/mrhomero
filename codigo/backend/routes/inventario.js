const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

router.get('/mostrar', invController.mostrarInventario);

router.post('/crear', invController.crearInventario);

module.exports = router