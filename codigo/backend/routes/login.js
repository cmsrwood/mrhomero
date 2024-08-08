const express = require('express');
const mysql = require('mysql');
const router = express.Router();



// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
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
            return res.send(`Inicio de sesión exitoso.Bienvenido, ${username}`);
        } else {
            return res.status(400).send('Contraseña incorrecta');
        }
    });
});

module.exports = router;