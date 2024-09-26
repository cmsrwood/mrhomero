const express = require('express');
const router = express.Router();
const provController = require('../controllers/admin/provController');

router.get('/mostrarProveedores', provController.mostrarProveedores);

module.exports = router