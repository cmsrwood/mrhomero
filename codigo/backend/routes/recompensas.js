const express = require('express');
const router = express.Router();
const recompensasController = require('../controllers/admin/recompensasController');

router.get('/mostrar',  recompensasController.mostrarRecompensas);
router.post('/crearRecompensa', recompensasController.upload, recompensasController.crearRecompensa);
router.put('/actualizarRecompensa/:id', recompensasController.actualizarRecompensa);
router.delete('/eliminarRecompensa/:id', recompensasController.eliminarRecompensa);

module.exports = router