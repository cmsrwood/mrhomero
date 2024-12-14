const express = require('express');
const router = express.Router();

const clientesRoutes = require('./clientes.routes');
const empleadoRoutes = require('./empleado.routes');

router.use('/clientes', clientesRoutes);
router.use('/empleados', empleadoRoutes);

module.exports = router;