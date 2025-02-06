// Mostrar todas las recompensas
exports.mostrarRecompensas = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas ORDER BY id_recomp DESC";
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}

// Mostrar una recompensa
exports.mostrarRecompensa = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas WHERE id_recomp = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}

// Verificar si la recompensa ya existe
exports.verificarNombre = async (recompensa) => {
    return new Promise((resolve, reject) => { 
        const q = "SELECT * FROM recompensas WHERE recompensa_nombre = ?";
        global.db.query(q, [recompensa],(err, results) => {
            if (err) reject(err);
            resolve(results.length > 0);
        })
    })
}

// Mostrar recompensas obtenidas
exports.mostrarRecompensasObtenidas = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas_obt where estado = 1 ORDER BY id_recomp_obt DESC";
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve({
                message: 'Recompensas obtenidas',
                data: results

            });
        })
    })
}

// Mostrar recompensas obtenidas por usuario
exports.mostrarRecompensasObtenidasPorUsuario = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas_obt WHERE id_user = ? and estado = 1 ORDER BY id_recomp_obt DESC";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}

// Mostrar puntos por usuario
exports.mostrarPuntos = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT user_puntos FROM usuarios WHERE id_user = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err);
            resolve({
                message: 'Puntos del usuario',
                id: id,
                data: results
            });
        })
    })
}

// Crear una recompensa
exports.crearRecompensa = async (recompensa) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO recompensas(`recompensa_nombre`, `recompensa_descripcion`, `recomp_num_puntos`, `recomp_foto`) VALUES (?)";
        const values = [
            recompensa.nombre,
            recompensa.descripcion,
            recompensa.puntos,
            recompensa.foto
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                id: results.insertId,
                recompensa: recompensa,
                message: "Recompensa creada con éxito"
            });
        })
    })
}

// Actualizar una recompensa
exports.actualizarRecompensa = async (id, recompensa) => { 
    return new Promise((resolve, reject) => { 
        const q = "UPDATE recompensas SET recompensa_nombre = ?, recompensa_descripcion = ?, recomp_num_puntos = ?, recomp_foto = ? WHERE id_recomp = ?";
        const values = [
            recompensa.nombre,
            recompensa.descripcion,
            recompensa.puntos,
            recompensa.foto,
            id
        ];
        global.db.query(q, values, (err, results) => { 
            if (err) reject(err);
            resolve({
                id: id,
                recompensa: recompensa,
                message: "Recompensa actualizada con éxito"
            });
        })
    })
}

// Eliminar una recompensa
exports.eliminarRecompensa = async (id) => { 
    return new Promise((resolve, reject) => { 
        const q = "DELETE FROM recompensas WHERE id_recomp = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => { 
            if (err) reject(err);
            resolve({
                id: id,
                message: "Recompensa eliminada con éxito"
            })
        })
    })
}