const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const authRepository = require('../repositories/authRepository');
const clientesRepository = require('../repositories/clientesRepository');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret';
const nodemailer = require('nodemailer');
const moment = require('moment');

const util = require('util');
const verifyAsync = util.promisify(jwt.verify);

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
    const usuario = response.results[0]

    const recuerdame = user.recuerdame ? true : false
    if (usuario.user_estado == 0) throw new BadRequestError('El usuario se encuentra inactivo');
    if (bcrypt.compareSync(user.password, usuario.user_pass)) {
        // Generar el token JWT
        const token = jwt.sign({ id: usuario.id_user, rol: usuario.id_rol }, secret, { expiresIn: recuerdame ? '30d' : '10s' });
        // Enviar el token y el rol de usuario
        return { token: token, rol: usuario.id_rol, email: usuario.user_email, message: response.message };
    } else {
        //inicio de sesion incorrecto
        throw new BadRequestError('Contraseña incorrecta');
    }
}

// Servicio para validar el token
exports.validarToken = async (token) => {
    try {
        const decoded = await verifyAsync(token, secret);
        return {
            rol: decoded.rol,
            decoded: decoded
        };
    } catch (err) {
        console.error("Error al verificar el token:", err);
        throw new BadRequestError('Token inválido');
    }
};

exports.registrar = async (user) => {
    const existe = await clientesRepository.mostrarClientePorEmail(user.user_email);
    const response = await authRepository.registrar(user);
    return response
}

exports.recuperar = async (email) => {
    const usuario = await clientesRepository.mostrarClientePorEmail(email);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expirationDate = moment().add(12, 'hour').format('YYYY-MM-DD HH:mm:ss');
    const id_usuario = usuario.id_user;

    try {
        const response = await authRepository.recuperar(verificationCode, expirationDate, id_usuario);
    } catch (error) {
        throw new Error('Error al guardar el código de verificación');
    }

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

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(new Error('Error al enviar el correo electrónico'));
            }
            resolve({ message: 'Código de verificación enviado por correo electrónico', email: email });
        });
    })
}
exports.resetPassword = async (datos) => {
    const usuarioRecuperar = await authRepository.traerUsuarioParaRecuperar(datos);
    if (usuarioRecuperar.length <= 0) throw new BadRequestError('El correo no se encuentra registrado en el sistema');

    const response = await authRepository.resetPassword(datos);
    return response
}