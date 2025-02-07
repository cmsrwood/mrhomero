const express = require('express');
const router = express.Router();
const empController = require('../../controllers/empController');

router.get('/', empController.mostrarEmpleados);
router.get('/:id', empController.mostrarEmpleado);
router.get('/horasPorMes/:id/:ano/:mes', empController.horasPorMes);
router.get('/mostrarHorasMes/:id/:ano/:mes', empController.MostrarHorasEmpleadoMes);
router.get('/horasDia/:id/:fecha', empController.horasDia);
router.put('/crear', empController.asignarRol);
router.put('/actualizar/:id', empController.EditarEmpleado);
router.put('/borrar/:id', empController.EliminarEmpleado);
router.post('/horaInicio/:id', empController.horaInicio);
router.post('/horaFin/:id', empController.horaFin);

module.exports = router;