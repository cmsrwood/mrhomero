const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { validateUser, validateToken } = require('../../middlewares/validateAuth');

// Get
router.get('/validarToken', validateToken, authController.validarToken);

// Post
router.post('/ingresar', validateUser, authController.ingresar);
router.post('/registrar', authController.registrar);
router.post('/recuperar', authController.recuperar);
router.post('/resetPassword', authController.resetPassword);

module.exports = router;