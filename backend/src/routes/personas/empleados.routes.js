const express = require('express');
const router = express.Router();
const empleadosController = require('../../controllers/empleadosController');
const { validateEmpleado } = require('../../middlewares/validateEmpleado');
const { validateId } = require('../../middlewares/validateGeneral');


/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Endpoints para gestionar los empleados
 */

/**
 * @swagger
 * /personas/empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 */
router.get('/', empleadosController.mostrarEmpleados);

/**
 * @swagger
 * /personas/empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado obtenido exitosamente
 *       400:
 *         description: ID inválido
 */
router.get('/:id', validateId, empleadosController.mostrarEmpleado);

/**
 * @swagger
 * /personas/empleados/horasPorMes/{id}/{ano}/{mes}:
 *   get:
 *     summary: Obtener las horas trabajadas por mes de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id_user         
 *         required: true
 *         schema:  
 *           type: string
 *         description: ID del empleado
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:  
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:  
 *           type: string
 *         description: Mes 
 *     responses:
 *       200:   
 *         description: Horas trabajadas obtenidas exitosamente por mes
 *       400:   
 *         description: ID inválido
 */
router.get('/horasPorMes/:id/:ano/:mes', empleadosController.horasPorMes);

/**
 * @swagger
 * /personas/empleados/mostrarHorasMes/{id}/{ano}/{mes}:
 *   get:
 *     summary: Obtener las horas trabajadas por mes de un empleado con detalles
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id_user         
 *         required: true
 *         schema:  
 *           type: string
 *         description: ID del empleado
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:  
 *           type: string
 *         description: Año
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:  
 *           type: string
 *         description: Mes 
 *     responses:
 *       200:   
 *         description: Horas trabajadas obtenidas exitosamente por mes con detalles
 *       400:   
 *         description: ID inválido
 */
router.get('/mostrarHorasMes/:id/:ano/:mes', empleadosController.MostrarHorasEmpleadoMes);

/**
 * @swagger
 * /personas/empleados/horasDia/{id}/{fecha}:
 *   get:
 *     summary: Obtener las horas trabajadas por día de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true         
 *         schema:  
 *           type: string
 *         description: ID del empleado
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:  
 *           type: string
 *         description: Fecha
 *     responses:
 *       200:   
 *         description: Horas trabajadas obtenidas exitosamente por dia
 *       400:   
 *         description: ID inválido
 */
router.get('/horasDia/:id/:fecha', empleadosController.horasDia);

/**
 * @swagger
 * /personas/empleados/horaInicio/{id}:
 *   post:
 *     summary: Marcar hora de inicio de trabajo de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Hora de inicio marcada exitosamente
 *       400:
 *         description: ID inválido
 */
router.post('/horaInicio/:id', empleadosController.horaInicio);

/**
 * @swagger
 * /personas/empleados/horaFin/{id}:
 *   post:
 *     summary: Marcar hora de salida de trabajo de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Hora de salida marcada exitosamente
 *       400:
 *         description: ID inválido
 */
router.post('/horaFin/:id', empleadosController.horaFin);

/**
 * @swagger
 * /personas/empleados/crear:
 *   post:
 *     summary: Crear un empleado
 *     tags: [Empleados]     
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: string
 *                 example: "empleado_id"
 *               id_rol:
 *                 type: string
 *                 example: "rol_id"
 *               nombre:
 *                 type: string
 *                 example: "Empleado 1"
 *               apellidos:
 *                 type: string
 *                 example: "Apellido 1"
 *               email:
 *                 type: string
 *                 example: "iKtQ8@example.com" 
 *               telefono:
 *                 type: string
 *                 example: "123456789"
 *               registro:
 *                 type: datetime
 *                 example: "2023-01-01"
 *     responses:
 *       200:
 *         description: Empleado creado exitosamente
 *       400:   
 *         description: ID inválido
 */
router.put('/crear', validateEmpleado, empleadosController.crearEmpleado);

/**
 * @swagger
 * /personas/empleados/actualizar:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Empleados]     
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: string
 *                 example: "empleado_id"
 *               id_rol:
 *                 type: string
 *                 example: "rol_id"
 *               nombre:
 *                 type: string
 *                 example: "Empleado 1"
 *               apellidos:
 *                 type: string 
 *                 example: "Apellido 1"
 *               email: 
 *                 type: string
 *                 example: "iKtQ8@example.com" 
 *               telefono:
 *                 type: string
 *                 example: "123456789"
 *               registro:
 *                 type: datetime
 *                 example: "2023-01-01"
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:       
 *         description: ID inválido
 */
router.put('/actualizar/', validateEmpleado, empleadosController.actualizarEmpleado);

/**
 * @swagger
 * /personas/empleados/eliminar/{id}:
 *   put:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       400:
 *         description: ID inválido
 */
router.put('/eliminar/:id', validateId, empleadosController.eliminarEmpleado);


module.exports = router;