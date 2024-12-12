const express = require('express');

const personasRoutes = require('./personas');
const tiendaRoutes = require('./tienda');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/personas', personasRoutes);
router.use('/tienda', tiendaRoutes);
router.use('/auth', authRoutes);

module.exports = router;