const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');

// Controladores de autenticación
router.post('/ingresar', empController.ingresar);

module.exports = router