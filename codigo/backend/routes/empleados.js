const express = require('express');
const router = express.Router();
const empController = require('../controllers/admin/empController');

// Controladores de autenticación
router.get('/mostrarEmpleados', empController.mostrarEmpleados);
router.put('/crearEmpleado', empController.asignarRol);
router.put('/actualizarEmpleado/:id', empController.EditarEmpleado);
router.put('/borrarEmpleado/:id', empController.EliminarEmpleado);
router.get('/mostrarHorasEmpleadoMes/:id/:ano/:mes', empController.MostrarHorasEmpleadoMes);


module.exports = router