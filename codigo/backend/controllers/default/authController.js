const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret';
const nodemailer = require('nodemailer');
const moment = require('moment');

// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "notificadormrhomero@gmail.com",
        pass: "exwr frwt rvbm kkgb"
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
            // Si la contraseña es correcta, generar el token JWT
            const token = jwt.sign({ id_user: user.id_user, email: user.user_email, rol: user.id_rol }, secret, {
                expiresIn: '1h' // El token expira en 1 hora
            });

            // Enviar el token y el rol de usuario
            return res.status(200).json({ token, rol: user.id_rol });
        } else {
            //inicio de sesion incorrecto
            return res.status(400).send('Contraseña incorrecta');
        }
    });
};

// Middleware para verificar el token
exports.validarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send('Error al verificar el token');
        }

        req.userId = decoded.id_user; // Almacenar el ID de usuario decodificado en la request
        req.userRol = decoded.rol; // Almacenar el rol del usuario
        next(); // Continuar con la siguiente función middleware o ruta
    });
};

// Ejemplo de una ruta protegida
exports.rutaProtegida = (req, res) => {
    res.status(200).send(`Bienvenido, usuario con rol ${req.userRol}`);
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
    const email = req.body.email;

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
        const expirationDate = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'); // Fecha de expiración en 1 hora

        // Guardar el código y la fecha de expiración en la base de datos
        db.query('UPDATE usuarios SET user_reset_code = ?, user_reset_code_expiration = ? WHERE id_user = ?', [verificationCode, expirationDate, user.id_user], (err) => {
            if (err) return res.status(500).json({ message: 'Error al guardar el código de verificación' + err });

            // Enviar el código de verificación por correo
            const mailOptions = {
                from: 'notificadormrhomero@gmail.com',
                to: email,
                subject: 'Código de verificación para restablecer contraseña || Mr. Homero',
                html: `
                <div class="container" style="background-color: #212529; color: #fff; padding: 80px;">
                    <div class="imagen" style="text-align: center;">
                        <img src="https://mrhomero.onrender.com/logo.png" alt="https://mrhomero.onrender.com/logo.png"
                            style="width: 20%; height: 20%;">
                    </div>
                    <h1>Recuperación de Contraseña</h1>
                    <p style="font-size: 25px;">Tu código de verificación es:</p>
                    <h2 style="font-size: 40px; font-weight: bold; color: #FFC107;">${verificationCode}</h2>
                    <p>Por favor, ingrésalo en el formulario de recuperación de contraseña.</p>
                    <p>Este código caducará en 1 hora.</p>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                    <p>Gracias,</p>
                    <p>El equipo de soporte</p>
                </div>
                `,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
                }
                res.status(200).json({ message: 'Código de verificación enviado por correo electrónico' });
            });
        });
    });
};

exports.resetPassword = (req, res) => {
    const verificationCode = req.body.verificationCode;
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query('SELECT * FROM usuarios WHERE user_reset_code = ? AND user_reset_code_expiration > ?', [verificationCode, fechaActual], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        else if (newPassword !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        else if (results.length === 0) {
            return res.status(400).send('Código de verificación inválido, expirado o usuario no encontrado');
        }

        const user = results[0];
        const hashPassword = bcrypt.hashSync(newPassword, 10)

        // Actualizar la contraseña y eliminar el código de verificación
        db.query('UPDATE usuarios SET user_pass = ?, user_reset_code = NULL, user_reset_code_expiration = NULL WHERE id_user = ?', [hashPassword, user.id_user], (err) => {
            if (err) return res.status(500).send('Error al actualizar la contraseña');
            res.status(200).send('Contraseña restablecida con éxito');
        });
    });
};

module.exports = exports;