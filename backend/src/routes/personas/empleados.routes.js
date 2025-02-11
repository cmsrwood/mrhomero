const express = require('express');
const router = express.Router();
const empleadosController = require('../../controllers/empleadosController');
const { validateEmpleado } = require('../../middlewares/validateEmpleado');
const { validateId } = require('../../middlewares/validateGeneral');

// Get
router.get('/', empleadosController.mostrarEmpleados);
router.get('/:id', validateId, empleadosController.mostrarEmpleado);
router.get('/horasPorMes/:id/:ano/:mes', empleadosController.horasPorMes);
router.get('/mostrarHorasMes/:id/:ano/:mes', validateId, empleadosController.MostrarHorasEmpleadoMes);
router.get('/horasDia/:id/:fecha', empleadosController.horasDia);

// Post
router.post('/horaInicio/:id', validateId, empleadosController.horaInicio);
router.post('/horaFin/:id', validateId, empleadosController.horaFin);

// Put
router.put('/crear', validateEmpleado, empleadosController.crearEmpleado);
router.put('/actualizar/', validateEmpleado, empleadosController.actualizarEmpleado);
router.put('/eliminar/:id', validateId, empleadosController.eliminarEmpleado);


module.exports = router;