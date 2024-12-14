const express = require('express');
const router = express.Router();
const empController = require('../../controllers/empController');

router.get('/empleados/', empController.mostrarEmpleados);
router.get('/empleados/:id', empController.mostrarEmpleadoId);
router.get('/empleados/horasPorMes/:id/:ano/:mes', empController.horasPorMes);
router.get('/empleados/mostrarHorasMes/:id/:ano/:mes', empController.MostrarHorasEmpleadoMes);
router.get('/empleados/horasDia/:id/:fecha', empController.horasDia);
router.put('/empleados/crear', empController.asignarRol);
router.put('/empleados/actualizar/:id', empController.EditarEmpleado);
router.put('/empleados/borrar/:id', empController.EliminarEmpleado);
router.post('/empleados/horaInicio/:id', empController.horaInicio);
router.post('/empleados/horaFin/:id', empController.horaFin);

module.exports = router;