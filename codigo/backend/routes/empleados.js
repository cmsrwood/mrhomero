const express = require('express');
const router = express.Router();
const empController = require('../controllers/admin/empController');

// Controladores de autenticación
router.get('/mostrarEmpleados', empController.mostrarEmpleados);
router.put('/crearEmpleado', empController.asignarRol);


module.exports = router