const express = require('express');
const router = express.Router();

const inventarioRoutes = require ('./inventario.routes');
const productosRoutes = require('./productos.routes')
const categoriasRoutes = require('./categorias.routes')
const proveedoresRoutes = require('./proveedores.routes')
const ventasRoutes = require('./ventas.routes')
const recompensasRoutes = require('./recompensas.routes')

router.use('/inventario', inventarioRoutes); //Listo
router.use('/productos', productosRoutes); //Listo
router.use('/categorias', categoriasRoutes); //Listo
router.use('/proveedores', proveedoresRoutes); //Listo
router.use('/ventas', ventasRoutes); //Proceso
router.use('/recompensas', recompensasRoutes); //proceso

module.exports = router