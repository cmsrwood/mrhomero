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

    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
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
        const verificationCode = generateVerificationCode();

        // Guardar el código en la base de datos (puedes usar una tabla separada o agregar un campo temporal)
        db.query('UPDATE usuarios SET user_reset_code = ? WHERE id_user = ?', [verificationCode, user.id_user], (err, results) => {
            if (err) return res.status(500).json({ message: 'Error al guardar el código de verificación' });
            const mailOptions = {
                from: 'dilanfantas@gmail.com',
                to: email,
                subject: 'Código de verificación para restablecer contraseña || Mr. Homero',
                html: `
                <div class="container" style="background-color: #212529; color: #fff; padding: 80px;">
                    <div class="imagen" style="text-align: center;">
                        <img src="https://mrhomero.onrender.com/logo.png" alt="https://mrhomero.onrender.com/logo.png"
                            style="width: 20%; height: 20%;">
                    </div>
                    <h1>Recuperación de Contraseña</h1>
                    <p>Tu código de verificación es:</p>
                    <h2 style="font-size: 24px; font-weight: bold; color: #FFC107;">${verificationCode}</h2>
                    <p>Por favor, ingrésalo en el formulario de recuperación de contraseña.</p>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                    <p>Gracias,</p>
                    <p>El equipo de soporte</p>
                </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
                }
                res.status(200).json({ message: 'Código de verificación enviado por correo electrónico' });
            });
        });
    })
};

module.exports = exports;