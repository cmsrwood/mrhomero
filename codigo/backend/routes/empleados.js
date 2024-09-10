const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');

// Controladores de autenticación
router.get('/empleados', empController.mostrarEmpleados);

module.exports = router