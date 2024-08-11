const db = require('../config/db');

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send('Por favor, ingrese email y contraseña');
    }

    // Buscar el usuario en la base de datos
    db.query('SELECT * FROM usuarios WHERE user_email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];

        // Comparar la contraseña
        if (user.user_pass === password) {
            return res.send(`Inicio de sesión exitoso. Bienvenido, ${user.user_nom} ${user.user_apels}`);
        } else {
            // El usuario y la contraseña no coinciden
            return res.status(400).send('Contraseña incorrecta');
        }
    });
};

module.exports = exports;