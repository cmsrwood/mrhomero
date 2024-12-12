const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const empController = require('../controllers/empController');

// Controladores de clientes
router.get('/clientes/', clienteController.mostrarClientes);
router.get('/clientes/:id', clienteController.mostrarClientesByid);
router.get('/clientes/mostrarCuentaClientesUltimoMes', clienteController.mostrarCuentaClientesUltimoMes);
router.put('/clientes/agregarPuntos/:id', clienteController.agregarPuntos);
router.put('/clientes/borrar/:id', clienteController.borrarCliente);
router.put('/clientes/restaurar/:id', clienteController.restaurarCliente);
router.put('/clientes/actualizar/:id', clienteController.upload, clienteController.actualizarCliente);


//Controladores de empleados
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