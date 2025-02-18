// Repositorio para mostrar a todos los empleados
exports.mostrarEmpleados = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT id_user, user_nom, user_apels, user_email, user_tel, user_foto, DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para mostrar a un empleado por el ID
exports.mostrarEmpleado = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT id_user, user_nom, user_apels, user_email, user_tel,user_foto, DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2 AND id_user = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        })
    })
}

// Repositorio para traer un usuario por su email
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

// Repositorio para crear un empleado
exports.crearEmpleado = async (empleado) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET id_rol = 2, user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE user_email = ?";
        const values = [
            empleado.nombre,
            empleado.apellidos,
            empleado.email,
            empleado.telefono,
            empleado.registro,
            empleado.email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                mesagge: "Empleado creado exitosamente",
            })
        })
    })
}

exports.actualizarEmpleado = async (empleado) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE id_user = ?";
        const values = [
            empleado.nombre,
            empleado.apellidos,
            empleado.email,
            empleado.telefono,
            empleado.registro,
            empleado.id
        ];

        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                mesagge: "Empleado actualizado exitosamente",
            })
        })
    })
}

// Repositorio para eliminar un empleado
exports.eliminarEmpleado = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET id_rol = 3  WHERE id_user = ?";
        const value = [
            id
        ];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve({
                mesagge: "Empleado eliminado exitosamente",
            })
        })
    })
}

// Repositorio para mostrar las horas de un empleado
exports.MostrarHorasEmpleadoMes = async (mes, ano, id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT DATE_FORMAT(hora_inicio, ' %Y-%m-%d %H:%i:%s') AS hora_inicio, DATE_FORMAT(hora_fin, '%Y-%m-%d %H:%i:%s') AS hora_fin, fecha FROM empleados_horas WHERE MONTH(hora_inicio) = ? AND YEAR(hora_inicio) = ? AND MONTH(hora_fin) = ? AND YEAR(hora_fin) = ? AND id_user = ? GROUP BY fecha ORDER BY fecha;";
        const values = [
            mes,
            ano,
            mes,
            ano,
            id
        ]
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para registrar la hora de inicio
exports.horaInicio = async (id, fecha, hora) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO empleados_horas (id_user, fecha, hora_inicio) VALUES (?)";
        const values = [
            id,
            fecha,
            hora
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para mostrar la hora de salida de un empleado
exports.horaFin = async (id, fecha, horaFin) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE empleados_horas SET hora_fin = ? WHERE id_user = ? AND fecha = ?";
        const values = [
            horaFin,
            id,
            fecha
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para mostrar las horas por dia de un empleado
exports.horasDia = async (id, fecha) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM empleados_horas WHERE id_user = ? AND fecha = ?";
        const values = [
            id,
            fecha
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        })
    })
}

// Repositorio para mostrar las horas trabajadas por mes
exports.horasPorMes = async (id, mes, ano) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT SUM(HOUR(hora_fin) - HOUR(hora_inicio)) as horas from  empleados_horas WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND id_user = ?";
        const values = [
            mes,
            ano,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}