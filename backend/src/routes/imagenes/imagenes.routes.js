const express = require('express');
const { upload, validateImagen } = require('../../middlewares/validateImagenes');
const imagenesController = require('../../controllers/imagenesController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Imagenes
 *   description: Endpoints para gestionar las imagenes
 */
/**
 * @swagger
 * /imagenes/subir:
 *   post:
 *     summary: Subir una imagen
 *     tags: [Imagenes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida exitosamente
 */

router.post('/subir', upload.single('foto'), validateImagen, imagenesController.subirImagen);

/**
 * @swagger
 * /imagenes/eliminar/{public_id}:
 *   delete:
 *     summary: Eliminar una imagen
 *     tags: [Imagenes]
 *     parameters:
 *       - in: path
 *         name: public_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada exitosamente
 */
router.post('/eliminar/:public_id', imagenesController.eliminarImagen);

module.exports = router;