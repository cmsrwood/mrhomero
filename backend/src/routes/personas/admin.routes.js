const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints para gestionar el admin
 */

/**
 * @swagger
 * /personas/admin/{id}:
 *   get:
 *     summary: Obtener un admin por ID
 *     tags: [Admin]     
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del admin
 *     responses:
 *       200:
 *         description: Admin obtenido exitosamente     
 *       400:
 *         description: ID inválido
 * 
 */
router.get('/:id', adminController.mostrarAdmin);

module.exports = router;

