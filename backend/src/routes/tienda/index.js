const express = require('express');
const router = express.Router();

const inventarioRoutes = require ('./inventario.routes');
const productosRoutes = require('./productos.routes')
const categoriasRoutes = require('./categorias.routes')
const proveedoresRoutes = require('./proveedores.routes')
const ventasRoutes = require('./ventas.routes')
const recompensasRoutes = require('./recompensas.routes')

router.use('/inventario', inventarioRoutes); 
router.use('/productos', productosRoutes); 
router.use('/categorias', categoriasRoutes); 
router.use('/proveedores', proveedoresRoutes); 
router.use('/ventas', ventasRoutes); 
router.use('/recompensas', recompensasRoutes); 

module.exports = router