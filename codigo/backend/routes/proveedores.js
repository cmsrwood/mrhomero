const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/admin/proveedorController');

router.get('/mostrarProveedor', proveedorController.mostrarProveedores);