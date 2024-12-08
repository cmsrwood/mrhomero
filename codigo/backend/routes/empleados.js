const express = require('express');
const router = express.Router();
const empController = require('../controllers/admin/empController');

// Controladores de autenticación
router.get('/mostrarEmpleados', empController.mostrarEmpleados);
router.get('/mostrarEmpleadoId/:id', empController.mostrarEmpleadoId);
router.put('/crearEmpleado', empController.asignarRol);
router.put('/actualizarEmpleado/:id', empController.EditarEmpleado);
router.put('/borrarEmpleado/:id', empController.EliminarEmpleado);
router.get('/mostrarHorasEmpleadoMes/:id/:ano/:mes', empController.MostrarHorasEmpleadoMes);
router.get('/horasDia/:id/:fecha', empController.horasDia);
router.post('/horaInicio/:id', empController.horaInicio);
router.post('/horaFin/:id', empController.horaFin);
router.get('/horasPorMes/:id/:ano/:mes', empController.horasPorMes);



module.exports = router