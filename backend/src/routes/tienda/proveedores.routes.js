const express = require('express');
const router = express.Router();
const provController = require('../../controllers/provController');

router.get('/', provController.mostrarProveedores);

router.post('/crear', provController.crearProveedor);

router.put('/actualizar/:id', provController.actualizarProveedor);

router.delete('/borrar/:id', provController.borrarProveedor);

module.exports = router