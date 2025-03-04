const moment = require('moment');

// Mostrar recompensas obtenidas
exports.mostrarRecompensasObtenidas = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas_obt where estado = 1 ORDER BY id_recomp_obt DESC";
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}
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
            resolve(results[0]);
        })
    })
}

// Verificar si la recompensa ya existe
exports.verificarNombre = async (recompensa) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas WHERE recompensa_nombre = ?";
        global.db.query(q, [recompensa], (err, results) => {
            if (err) reject(err);
            resolve(results.length > 0);
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
            resolve(results);
        })
    })
}

// Crear una recompensa
exports.crearRecompensa = async (recompensa) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO recompensas( `id_recomp`, `recompensa_nombre`, `recompensa_descripcion`, `recomp_num_puntos`, `recomp_foto`) VALUES (?)";
        const values = [
            recompensa.id,
            recompensa.nombre,
            recompensa.descripcion,
            recompensa.puntos,
            recompensa.foto
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                recompensa: recompensa,
                message: "Recompensa creada con éxito"
            });
        })
    })
}

// Actualizar una recompensa
exports.actualizarRecompensa = async (id, recompensa) => {
    const res = await this.mostrarRecompensa(id);
    const recompensaBaseDatos = res;
    return new Promise((resolve, reject) => {
        const q = "UPDATE recompensas SET recompensa_nombre = ?, recompensa_descripcion = ?, recomp_num_puntos = ?, recomp_foto = ? WHERE id_recomp = ?";
        const values = [
            recompensa.nombre ? recompensa.nombre : recompensaBaseDatos.recompensa_nombre,
            recompensa.descripcion ? recompensa.descripcion : recompensaBaseDatos.recompensa_descripcion,
            recompensa.puntos ? recompensa.puntos : recompensaBaseDatos.recomp_num_puntos,
            recompensa.foto ? recompensa.foto : recompensaBaseDatos.recomp_foto,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                recompensa: recompensa,
                message: "Recompensa actualizada con éxito"
            });
        })
    })
}

// Eliminar una recompensa
exports.eliminarRecompensa = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE recompensas SET recomp_estado = 0 WHERE id_recomp = ?";
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

exports.restaurarRecompensa = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE recompensas SET recomp_estado = 1 WHERE id_recomp = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err);
            resolve({
                message: "Recompensa restaurada con éxito"
            })
        })
    })
}

// Insertar recompensa obtenida
exports.insertarRecompensaObtenida = async (id_recompensa, id_usuario, codigo) => {
    const fecha_reclamo = moment().format('YYYY-MM-DD HH:mm:ss');
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO recompensas_obt (`id_recomp`, `id_user`, `codigo`, `fecha_reclamo`) VALUES (?)";
        const values = [
            id_recompensa,
            id_usuario,
            codigo,
            fecha_reclamo
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                message: `El codigo de la recompensa es: ${codigo}`
            })
        })
    })
}

// Actualizar puntos de usuario 
exports.actualizarPuntos = async (id, puntos) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE usuarios SET user_puntos = user_puntos - ? WHERE id_user = ?";
        const values = [
            puntos,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                id: id,
                puntos: puntos,
                message: "Se han agregado " + puntos + " puntos a la cuenta"
            })
        })
    })
}

// Traer las recompensas obtenidas por id
exports.mostrarRecompensasObtenidasPorId = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM recompensas_obt WHERE id_recomp_obt = ?";
        const value = [id];
        global.db.query(q, value, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}

// Validar codigo de la recompensa
exports.validarCodigoRecompensa = async (id, codigo) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE recompensas_obt SET estado = 0 WHERE id_recomp_obt = ? AND codigo = ?";
        const values = [
            id,
            codigo
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                id: id,
                codigo: codigo,
                message: "Recompensa validada con éxito",
            })
        })
    })
}
