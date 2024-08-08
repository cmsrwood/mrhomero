const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));


// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'mrhomero.cp84e8ay06n5.us-east-2.rds.amazonaws.com',
    user: 'homero',
    password: 'Awsmrhomero',
    database: 'mrhomero',
    connectTimeout: 10000
});


// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

db.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Reconectar a la base de datos si se pierde la conexión
        db.connect(function (err) {
            if (err) {
                console.error('Error reconectando a la base de datos:', err);
            } else {
                console.log('Reconectado a la base de datos MySQL');
            }
        });
    } else {
        console.error('Error en la base de datos:', err);
    }
});


app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }
        res.send(results);
    });
});





app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Por favor, ingrese nombre de usuario y contraseña');
    }

    // Buscar el usuario en la base de datos
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(400).send('Nombre de usuario incorrecto');
        }

        const user = results[0];

        // Comparar la contraseña
        if (user.password === password) {
            return res.send(`Inicio de sesión exitoso. Bienvenido, ${username}`);
        } else {
            return res.status(400).send('Contraseña incorrecta');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});