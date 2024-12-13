const express = require('express');
const router = express.Router();

//Controladores
const ventasController = require('../controllers/ventasController');
const menuController = require('../controllers/menuController');
const provController = require('../controllers/provController');
const productosController = require('../controllers/productosController');
const invController = require('../controllers/invController');
const recompensasController = require('../controllers/recompensasController');

// Middlewares
const { validateMenu } = require('../middlewares/validateMenu');

//Controladores para Ventas

router.get('/ventas/', ventasController.mostrarVentas);
router.get('/ventas/:id', ventasController.mostrarCompras);
router.get('/ventas/detalle/:id', ventasController.mostrarDetalleVenta);
router.get('/ventas/ProductosMasVendidos/:ano/:mes', ventasController.mostrarProductosMasVendidos);
router.get('/ventas/ProductosMasCompradosPorCliente/:id', ventasController.mostrarProductosMasCompradosPorCliente);
router.get('/ventas/CuentaProductosVendidosPorMes/:ano/:mes', ventasController.mostrarCuentaProductosVendidosPorMes);
router.get('/ventas/VentasMensuales/:ano/:mes', ventasController.ventasMensuales);
router.get('/ventas/VentasPorMes/:ano/:mes', ventasController.cantidadPrecioVentas);
router.get('/ventas/crearReporte/:ano/:mes', ventasController.generarPDFVentasMensuales);
router.get('/ventas/crearReporte/:ano', ventasController.generarPDFVentasAnuales);

router.post('/ventas/crear', ventasController.crearVenta)
router.post('/ventas/crearDetalleVenta', ventasController.crearDetalleVenta);

router.put('/ventas/borrar/:id', ventasController.borrarVenta);
router.put('/ventas/restaurar/:id', ventasController.restaurarVenta);

//controladores para proveedores

router.get('/proveedores/', provController.mostrarProveedores);

router.post('/proveedores/crear', provController.crearProveedor);

router.put('/proveedores/actualizar/:id', provController.actualizarProveedor);

router.delete('/proveedores/borrar/:id', provController.borrarProveedor);


// Controladores de categorias para menu

router.get('/categorias/', menuController.mostrarCategorias);
router.get('/categorias/:id', menuController.mostrarCategoria);

router.post('/categorias/crear', validateMenu, menuController.crearCategoria);

router.put('/categorias/actualizar/:id', validateMenu, menuController.actualizarCategoria);

router.delete('/categorias/eliminar/:id', menuController.eliminarCategoria);


//Controladores para cada categoria

router.get('/productos/categoria/:id', productosController.mostrarProductosPorcategoria);
router.get('/productos/', productosController.mostrarProductos);
router.get('/productos/:id', productosController.mostrarProducto);

router.post('/productos/crear', productosController.uploadProducto, productosController.crearProducto);

router.put('/productos/actualizar/:id', productosController.uploadProducto, productosController.actualizarProducto);

router.delete('/productos/borrar/:id', productosController.borrarProducto);


// Controlador para el inventario

router.get('/inventario/', invController.mostrarInventario);
router.get('/inventario/categorias', invController.mostrarCategorias);
router.get ('/inventario/proveedores', invController.mostrarProveedores);

router.post('/inventario/crear', invController.crearInventario);

router.put('/inventario/actualizar/:id', invController.actualizarInventario);

router.delete('/inventario/borrar/:id', invController.borrarInventario);

//Controladores para recompensas

router.get('/recompensas/', recompensasController.mostrarRecompensas);
router.get('/recompensas/:id', recompensasController.mostrarRecompensasObtenidasPorUsuario);
router.get('/recompensas/obtenidas/', recompensasController.mostrarRecompensasObtenidas);
router.get('/recompensas/puntos/:id', recompensasController.mostrarPuntos);

router.post('/recompensas/crear', recompensasController.upload, recompensasController.crearRecompensa);
router.post('/recompensas/reclamar/:id_usuario', recompensasController.reclamarRecompensa);

router.put('/recompensas/actualizar/:id', recompensasController.upload, recompensasController.actualizarRecompensa);
router.put('/recompensas/validar/:id', recompensasController.validarRecompensa);

router.delete('/recompensas/eliminar/:id', recompensasController.eliminarRecompensa);

module.exports = router