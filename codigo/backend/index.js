const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/empleados');
const invRoutes = require('./routes/inventario');
const clientesRoutes = require('./routes/clientes');
const menuRoutes = require('./routes/menu');
const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const ventasRoutes = require('./routes/ventas');
const recompensasRoutes = require('./routes/recompensas');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const port = process.env.PORT || 4400;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empRoutes);
app.use('/api/inventario', invRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/recompensas', recompensasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
