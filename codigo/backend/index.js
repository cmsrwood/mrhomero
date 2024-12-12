const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const port = process.env.PORT || 4400;

const app = express();

// Middlewares

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas

app.use('/api', routes);

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
