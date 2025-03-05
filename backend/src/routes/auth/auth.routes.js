const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { validateUser, validateToken } = require('../../middlewares/validateAuth');

// Get

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para gestionar la autenticación
 */
/**
 * @swagger
 * /auth/validarToken:
 *   get:
 *     summary: Validar token
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Token válido
 */
router.get('/validarToken', validateToken, authController.validarToken);

// Post
/**
 * @swagger
 * /auth/ingresar:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:Ingreso exitoso
 *       400:Error al ingresar
 */
router.post('/ingresar', validateUser, authController.ingresar);

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 *       400:
 *         description: Error al registrar
 * 
 */
router.post('/registrar', authController.registrar);
/**
 * @swagger
 * /auth/recuperar:
 *   post:
 *     summary: Recuperar contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña recuperada
 *       400:
 *         description: Error al recuperar
 */
router.post('/recuperar', authController.recuperar);
/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña restablecida
 *       400:
 */
router.post('/resetPassword', authController.resetPassword);

module.exports = router;