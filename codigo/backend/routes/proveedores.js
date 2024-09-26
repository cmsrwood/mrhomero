const express = require('express');
const router = express.Router();
const provController = require('../controllers/admin/provController');

router.get('/mostrarProveedores', provController.mostrarProveedores);

router.post('/crearProveedores', provController.crearProveedores);

module.exports = router