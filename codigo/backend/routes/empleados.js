const express = require('express');
const router = express.Router();
const empController = require('../controllers/admin/empController');

// Controladores de autenticación
router.get('/empleados', empController.mostrarEmpleados);

module.exports = router