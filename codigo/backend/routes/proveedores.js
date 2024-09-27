const express = require('express');
const router = express.Router();
const provController = require('../controllers/admin/provController');

router.get('/mostrarProveedores', provController.mostrarProveedores);

router.post('/crearProveedor', provController.crearProveedor);

router.delete('/borrarProveedor/:id', provController.borrarProveedor);

router.put('/actualizarProveedor/:id', provController.actualizarProveedor);

module.exports = router