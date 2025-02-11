const { ExistNameError, NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const authRepository = require('../repositories/authRepository');

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

//Servicio para ingresar
exports.ingresar = async (user) => {

    const response = await authRepository.ingresar(user);

    if (response.length <= 0) throw new NotFoundError('El correo no está registrado en el sistema');

    const usuario = response[0]

    if (bcrypt.compareSync(user.password, usuario.user_pass)) {

        // Generar el token JWT
        const token = jwt.sign({ id: usuario.id_user, rol: usuario.id_rol }, secret);

        // Enviar el token y el rol de usuario
        return { token: token, rol: usuario.id_rol, email: usuario.user_email };
    } else {
        //inicio de sesion incorrecto
        throw new BadRequestError('Contraseña incorrecta');
    }
}

exports.validarToken = async (token) => {

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error("Error al verificar el token:", err);
            return res.status(401).json('Error al verificar el token');
        }

        return { token: token, rol: decoded.rol };
    });
};

