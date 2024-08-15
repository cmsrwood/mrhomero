const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Controladores de autenticación
router.post('/ingresar', authController.ingresar);
router.post('/registrar', authController.registrar);
router.post('/recuperar', authController.recuperar)
router.post('/resetPassword', authController.resetPassword)

module.exports = router