const express = require('express');
const router = express.Router();
const authController = require('../controllers/default/authController');

// Controladores de autenticación
router.post('/ingresar', authController.ingresar);
router.post('/registrar', authController.registrar);
router.post('/recuperar', authController.recuperar);
router.post('/resetPassword', authController.resetPassword);
router.get('/validarToken', authController.validarToken);
router.get('/rutaProtegida', authController.rutaProtegida);

module.exports = router;