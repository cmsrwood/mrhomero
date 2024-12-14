const express = require('express');
const router = express.Router();
const recompensasController = require('../../controllers/recompensasController');

router.get('/recompensas/', recompensasController.mostrarRecompensas);
router.get('/recompensas/:id', recompensasController.mostrarRecompensa);

router.post('/recompensas/crear', recompensasController.crearRecompensa);

router.put('/recompensas/actualizar/:id', recompensasController.actualizarRecompensa);

router.delete('/recompensas/borrar/:id', recompensasController.borrarRecompensa);

module.exports = router