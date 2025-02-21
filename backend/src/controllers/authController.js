
const nodemailer = require('nodemailer');
const moment = require('moment');
const {NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');


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

const authServices = require('../services/authServices');

exports.ingresar = async (req, res, next) => {
    try {
        const user = req.body
        const respose = await authServices.ingresar(user);
        res.status(200).json(respose);
    } catch (error) {
        next(error)
    }
};

exports.validarToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const response = await authServices.validarToken(token);
        req.user = response.decoded
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

exports.registrar = (req, res, next) => {
    try {
        const user = req.body
        const response = authServices.registrar(user);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};
exports.recuperar = (req, res, next) => {
    try {
        const email = req.body.email;
        const response = authServices.recuperar(email);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
};

exports.resetPassword = (req, res, next) => {
    const verificationCode = req.body.verificationCode;
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query('SELECT * FROM usuarios WHERE user_reset_code = ? AND user_reset_code_expiration > ?', [verificationCode, fechaActual], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json('Error en el servidor');
        }

        else if (newPassword !== confirmPassword) {
            return res.status(400).json('Las contraseñas no coinciden');
        }

        else if (results.length === 0) {
            return res.status(400).json('Código de verificación inválido, expirado o usuario no encontrado');
        }

        const user = results[0];
        const hashPassword = bcrypt.hashSync(newPassword, 10)

        // Actualizar la contraseña y eliminar el código de verificación
        db.query('UPDATE usuarios SET user_pass = ?, user_reset_code = NULL, user_reset_code_expiration = NULL WHERE id_user = ?', [hashPassword, user.id_user], (err) => {
            if (err) return res.status(500).json('Error al actualizar la contraseña');
            res.status(200).json('Contraseña restablecida con éxito');
        });
    });
};

module.exports = exports;