// Mostrar a todos los empleados
exports.mostrarEmpleados = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT id_user, user_nom, user_apels, user_email, user_tel, user_foto, DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

//Mostrar a un empleado por el ID
exports.mostrarEmpleado = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT id_user, user_nom, user_apels, user_email, user_tel,user_foto, DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2 AND id_user = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Traer un usuario por su email
exports.traerUsuarioPorEmail = async (email) => { 
    return new Promise((resolve, reject) => { 
        const q = "SELECT * FROM usuarios WHERE user_email = ?";
        const value = [email];
        global.db.query(q, value, (err, results) => { 
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Pasar un usuario a un empleado
exports.crearEmpleado = async () => { 
    return new Promise((resolve, reject) => {
        const q = {}
    })
}