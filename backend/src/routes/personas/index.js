const express = require('express');
const router = express.Router();

const clientesRoutes = require('./clientes.routes');
const empleadosRoutes = require('./empleados.routes');

router.use('/clientes', clientesRoutes);
router.use('/empleados', empleadosRoutes);

module.exports = router;