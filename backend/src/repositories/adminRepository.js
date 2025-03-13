exports.mostrarAdmin = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE id_user = ? AND id_rol = 1";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        })
    })
}