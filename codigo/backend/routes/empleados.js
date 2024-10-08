const express = require('express');
const router = express.Router();
const empController = require('../controllers/admin/empController');

// Controladores de autenticación
router.get('/mostrarEmpleados', empController.mostrarEmpleados);

module.exports = router