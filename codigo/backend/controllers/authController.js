const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.ingresar = (req, res) => {
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

        // Verificar la contraseña
        if (bcrypt.compareSync(password, user.user_pass)) {
            return res.status(200).send('Iniciaste sesion');
        }

        else {
            //inicio de sesion correcto
            return res.status(400).send('Contraseña incorrecta');
        }
    });
};

exports.registrar = (req, res) => {
    
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM usuarios WHERE user_email = ?", [email], (err, result) => {

        if (err) {
            res.send(err)
        }
        
        if (password.length < 8) {
            return res.status(400).send('La contraseña debe tener al menos 6 caracteres');
        }

        if (result.length > 0) {
            res.send("El usuario ya existe")
        } else {
            const hashpassword = bcrypt.hashSync(password, 10)
            const q = "INSERT INTO usuarios (user_nom, user_apels, user_email, user_pass , id_rol) VALUES (?,?,?,?,3)"
            const values = [
                nombres,
                apellidos,
                email,
                hashpassword
            ]
            db.query(q, values, (err) => {
                if (err) {
                    res.send(err)
                }
                res.send("Usuario registrado con exito")
            })
        }
    })
};

module.exports = exports;