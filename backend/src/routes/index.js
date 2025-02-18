const express = require('express');

const personasRoutes = require('./personas');
const tiendaRoutes = require('./tienda');
const authRoutes = require('./auth');
const imagenesRoutes = require('./imagenes');

const router = express.Router();

router.use('/personas', personasRoutes);
router.use('/tienda', tiendaRoutes);
router.use('/auth', authRoutes);
router.use('/imagenes', imagenesRoutes);

module.exports = router;