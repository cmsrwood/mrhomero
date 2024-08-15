const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = 'mysecretkey';
const nodemailer = require('nodemailer');

// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dilanfantas@gmail.com',
        pass: 'jegc hedq jngv tyyg'
    }
});

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

            console.log('El usuario es:', user);
            // inicio de sesion correcto
            return res.status(200).send('Iniciaste sesion');
        }

        else {
            //inicio de sesion incorrecto
            return res.status(400).send('Contraseña incorrecta');
        }
    });
};

exports.registrar = (req, res) => {

    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    db.query("SELECT * FROM usuarios WHERE user_email = ?", [email], (err, result) => {

        if (err) {
            return res.status(500).send(err)
        }

        else if (result.length > 0) {
            return res.status(400).send("El usuario ya existe")
        }

        else if (password !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        else if (password.length < 8) {
            return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
        }

        else {
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
                    return res.status(500).send(err)
                }
                return res.status(200).send("Usuario creado con exito")
            })
        }
    })
};
exports.recuperar = (req, res) => {

    const email = req.body.email

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
        const token = jwt.sign({ id: user.id_user }, secret, { expiresIn: '1h' })

        const resetLink = `http://localhost:5173/recuperar/${token}`;
        const mailOptions = {
            from: 'dilanfantas@gmail',
            to: email,
            subject: 'Recuperar contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send('Error al enviar el correo');
            }
            console.log('Correo enviado:', info.response);
            return res.status(200).send('Correo enviado');
        });
    })
};

module.exports = exports;