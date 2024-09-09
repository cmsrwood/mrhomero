const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8080;

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

/* Hola mundo para probar */
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});