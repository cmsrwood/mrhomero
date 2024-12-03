const express = require('express');
const router = express.Router();
const recompensasController = require('../controllers/admin/recompensasController');

router.get('/mostrar', recompensasController.mostrarRecompensas);
router.get('/mostrar/:id', recompensasController.mostrarRecompensasObtenidasPorUsuario);
router.get('/mostrarRecompensasObtenidas/', recompensasController.mostrarRecompensasObtenidas);
router.get('/mostrarPuntos/:id', recompensasController.mostrarPuntos);
router.post('/crearRecompensa', recompensasController.upload, recompensasController.crearRecompensa);
router.post('/reclamarRecompensa/:id_usuario', recompensasController.reclamarRecompensa);
router.put('/actualizarRecompensa/:id', recompensasController.upload, recompensasController.actualizarRecompensa);
router.put('/validarRecompensa/:id', recompensasController.validarRecompensa);
router.delete('/eliminarRecompensa/:id', recompensasController.eliminarRecompensa);

module.exports = router