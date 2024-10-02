const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/empleados');
const invRoutes = require('./routes/inventario');
const clientesRoutes = require('./routes/clientes');
const menuRoutes = require('./routes/menu');
const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173 ';

const app = express();
const port = process.env.PORT || 4400;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas

/* Ruta login */
app.use('/api/auth', authRoutes);

/* Ruta empleados */
app.use('/api/empleados', empRoutes);

/* Ruta inventario */
app.use('/api/inventario', invRoutes);

// Ruta clientes
app.use('/api/clientes', clientesRoutes);

// Ruta menu
app.use('/api/menu', menuRoutes);

// Ruta proveedor
app.use('/api/proveedores', proveedoresRoutes);

//Ruta productos 
app.use('/api/productos', productosRoutes);

/* Hola mundo para probar */
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});