const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/login');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_de_la_base_de_datos'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.use('/login', authRoutes);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});