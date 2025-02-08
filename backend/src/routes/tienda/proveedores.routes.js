const express = require('express');
const router = express.Router();
const provController = require('../../controllers/proveedoresController');
const { validateProveedor } = require('../../middlewares/validateProveedor');

//Get
router.get('/', provController.mostrarProveedores);

//Post
router.post('/crear', validateProveedor, provController.crearProveedor);

//Put
router.put('/actualizar/:id', validateProveedor, provController.actualizarProveedor);

//Delete
router.delete('/borrar/:id', provController.borrarProveedor);

module.exports = router