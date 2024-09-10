const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

router.get('/mostrarinventario', invController.mostrarInventario);

module.exports = router