const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/ingresar', authController.ingresar);
router.post('/registrar', authController.registrar);

module.exports = router