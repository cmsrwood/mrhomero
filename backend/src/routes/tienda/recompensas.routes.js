const express = require('express');
const router = express.Router();
const recompensasController = require('../../controllers/recompensasController');
const validateRecompensa = require('../../middlewares/validateRecompensa');

router.get('/', recompensasController.mostrarRecompensas);
router.get('/:id', recompensasController.mostrarRecompensa);
router.get('/recompensasObtenidas', recompensasController.mostrarRecompensasObtenidas);
router.get('/recompensasUsuario/:id', recompensasController.mostrarRecompensasObtenidasPorUsuario);
router.get('/puntosUsuario/:id', recompensasController.mostrarPuntos);

router.post('/crear', validateRecompensa, recompensasController.crearRecompensa);
router.post('/validar/:id', recompensasController.validarRecompensa);
router.post('/reclamar/:id', recompensasController.reclamarRecompensa);

router.put('/actualizar/:id', validateRecompensa, recompensasController.actualizarRecompensa);

router.delete('/borrar/:id', recompensasController.eliminarRecompensa);

module.exports = router