const express = require('express');
const router = express.Router();

const clientesRoutes = require('./clientes.routes');
const empleadosRoutes = require('./empleados.routes');
const adminRoutes = require('./admin.routes');

router.use('/clientes', clientesRoutes);
router.use('/empleados', empleadosRoutes);
router.use('/admin', adminRoutes)

module.exports = router;