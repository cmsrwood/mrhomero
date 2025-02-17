const express = require('express');
const router = express.Router();
const recompensasController = require('../../controllers/recompensasController');
const validateRecompensa = require('../../middlewares/validateRecompensa');

//Get
router.get('/', recompensasController.mostrarRecompensas);
router.get('/:id', recompensasController.mostrarRecompensa);
router.get('/recompensasObtenidas/recompensas', recompensasController.mostrarRecompensasObtenidas);
router.get('/recompensasUsuario/:id', recompensasController.mostrarRecompensasObtenidasPorUsuario);
router.get('/puntosUsuario/:id', recompensasController.mostrarPuntos);

//Post
router.post('/crear', validateRecompensa, recompensasController.crearRecompensa);
router.post('/reclamar/:id', recompensasController.reclamarRecompensa);

//Put
router.put('/actualizar/:id', validateRecompensa, recompensasController.actualizarRecompensa);
router.put('/validar/:id', recompensasController.validarRecompensa);


//Delete
router.delete('/eliminar/:id', recompensasController.eliminarRecompensa);

module.exports = router