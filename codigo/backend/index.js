const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/empleados');
const invRoutes = require('./routes/inventario');
const clientesRoutes = require('./routes/clientes');

const app = express();
const port = process.env.PORT || 4400;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas

/* Ruta login */
app.use('/auth', authRoutes);

/* Ruta empleados */
app.use('/empleados', empRoutes);

/* Ruta inventario */
app.use('/inventario', invRoutes);

// Ruta clientes
app.use ('/clientes', clientesRoutes);

/* Hola mundo para probar */
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});