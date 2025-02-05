const express = require('express');
const router = express.Router();
const provController = require('../../controllers/proveedoresController');
const { validateProveedor } = require('../../middlewares/validateProveedor');

router.get('/', provController.mostrarProveedores);

router.post('/crear', validateProveedor, provController.crearProveedor);

router.put('/actualizar/:id', validateProveedor, provController.actualizarProveedor);

router.delete('/borrar/:id', provController.borrarProveedor);

module.exports = router