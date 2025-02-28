//Repositorio para ingresar
const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.ingresar = async (user) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_email = ?";
        const values = [
            user.email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                results: results,
                message: "¡Bienvenido, has iniciado sesión con éxito!"
            });
        });
    });
}

exports.traerClientePorEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_email = ?";
        const values = [
            email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

exports.registrar = async (user) => {
    const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    const hashpassword = bcrypt.hashSync(user.password, 10);
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO usuarios (id_user, user_nom, user_apels, user_email, user_pass , id_rol, user_fecha_registro) VALUES (?,?,?,?,?,3,?)";
        const values = [
            user.id,
            user.nombres,
            user.apellidos,
            user.email,
            hashpassword,
            fecha
        ]
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                message: "El usuario se ha creado con exito."
            });
        });
    });
}

exports.recuperar = async (codigo, expirationDate, id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET user_reset_code = ?, user_reset_code_expiration = ? WHERE id_user = ?";
        const values = [
            codigo,
            expirationDate,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                results: results,
                message: "El código de recuperación se ha enviado con éxito."
            });
        });
    })
}

exports.traerUsuarioParaRecuperar = async (datos) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_reset_code = ? AND user_reset_code_expiration > ? AND user_email = ?";	
        const values = [
            datos.verificationCode,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            datos.email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    })
}

exports.resetPassword = async (datos) => {
    const hashPassword = bcrypt.hashSync(datos.newPassword, 10);
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET user_pass = ?, user_reset_code = NULL, user_reset_code_expiration = NULL WHERE user_email = ?";
        const values = [
            hashPassword,
            datos.email,
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                results: results,
                message: "La contraseña se ha restablecido con éxito."
            });
            console.log (results);
        });
    })
}