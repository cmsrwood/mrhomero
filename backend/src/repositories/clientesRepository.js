// Repositorio para mostrar clientes 
exports.mostrarClientes = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE id_rol = 3`;
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Repositorio para mostrar cliente
exports.mostrarCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE id_user = ?`;
        global.db.query(q, id, (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        });
    })
}

// Repositorio para mostrar clientes por correo
exports.mostrarClientePorEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE user_email = ?`;
        const value = [email];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        });
    })
}

// Repositorio para mostrar clientes de la ultima semana
exports.cuentaClientesUltimoMes = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE id_rol = 3 AND MONTH(user_fecha_registro) = MONTH(CURRENT_DATE) AND YEAR(user_fecha_registro) = YEAR(CURRENT_DATE)`;
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Repositorio para agregar puntos 
exports.agregarPuntos = async (id, puntos) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE usuarios SET user_puntos = user_puntos + ? WHERE id_user = ?`;
        const values = [puntos, id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results)
        })
    })
};

// Repositorio para actualizar cliente
exports.actualizarCliente = async (id, cliente) => {
        const userBD = await this.mostrarCliente(id);
    return new Promise((resolve, reject) => {
        const q = `UPDATE usuarios SET user_nom = ?, user_apels = ?, user_tel = ?, user_foto = ? WHERE id_user = ?`;
        const values = [
            cliente.user_nom? cliente.user_nom : userBD.user_nom,
            cliente.user_apels? cliente.user_apels : userBD.user_apels,
            cliente.user_tel? cliente.user_tel : userBD.user_tel,
            cliente.foto? cliente.foto : userBD.user_foto,
            id
        ]
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                cliente: cliente,
                message: "El cliente se ha actualizado correctamente"
            })
        })
    })
}

// Repositorio para eliminar cliente
exports.eliminarCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE usuarios SET user_estado = 0  WHERE id_user = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err);
            resolve({
                message: "El cliente se ha borrado correctamente"
            })
        });
    })
}

// Repositorio para restaurar cliente 
exports.restaurarCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE usuarios SET user_estado = 1  WHERE id_user = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err);
            resolve({
                message: " El cliente se ha restaurado correctamente "
            })
        })
    })
}