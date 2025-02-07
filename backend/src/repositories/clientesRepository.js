//mostrar clientes 
exports.mostrarClientes = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE id_rol = 3`;
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

//mostrar cliente
exports.mostrarCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM usuarios WHERE id_user = ?`;
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}
exports.actualizarCliente = async (id, cliente) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE usuarios SET user_nom = ?, user_apels = ?, user_tel = ?, user_foto = ? WHERE id_user = ?`;
        const values = [
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.foto,
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