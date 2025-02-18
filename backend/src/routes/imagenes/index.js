const express = require('express');
const router = express.Router();

const imagenesRoutes = require('./imagenes.routes');

router.use('/', imagenesRoutes);

module.exports = router;