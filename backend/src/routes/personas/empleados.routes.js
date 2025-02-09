const express = require('express');
const router = express.Router();
const empController = require('../../controllers/empController');
const { validateEmpleado } = require('../../middlewares/validateEmpleado');
const { validateId } = require('../../middlewares/validateGeneral');

// Get
router.get('/', empController.mostrarEmpleados);
router.get('/:id', validateId, empController.mostrarEmpleado);
router.get('/horasPorMes/:id/:ano/:mes', empController.horasPorMes);
router.get('/mostrarHorasMes/:id/:ano/:mes', validateId, empController.MostrarHorasEmpleadoMes);
router.get('/horasDia/:id/:fecha', empController.horasDia);

// Post
router.post('/horaInicio/:id', validateId, empController.horaInicio);
router.post('/horaFin/:id', validateId, empController.horaFin);

// Put
router.put('/actualizar', validateEmpleado, empController.actualizarEmpleado);
router.put('/eliminar/:id', validateId, empController.eliminarEmpleado);


module.exports = router;