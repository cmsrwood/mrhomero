

exports.mostrarProductos = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

exports.mostrarProductosPorCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos where id_categoria = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

exports.mostrarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos WHERE id_producto = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results);
        });
    })
}

exports.verificarNombre = async (nombre) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos WHERE pro_nom = ?";
        global.db.query(q, [nombre], (err, results) => {
            if (err) reject(err)
            resolve(results.length > 0);
        })
    })
}

exports.crearProducto = async (nombre, descripcion, precio, foto, puntos, id_categoria) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO productos (`pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES (?)";
        const values = [
            nombre,
            descripcion,
            precio,
            foto,
            puntos,
            id_categoria
        ];
        global.db.query(q, [values], (err) => {
            if (err) reject(err);
            resolve({
                message: "El producto se ha creado correctamente"
            })
        }
        )
    })
}

exports.actualizarProducto = async (id, nombre, descripcion, precio, foto, puntos) => {
    return new Promise((resolve, reject) => {
        const qUpdate = `UPDATE productos SET pro_nom = ?, pro_desp = ?, pro_precio = ?, pro_foto = ?, pro_puntos = ? WHERE id_producto = ?`;
        const values = [
            nombre,
            descripcion,
            precio,
            foto,
            puntos,
            id
        ];
        db.query(qUpdate, values, (err) => {
            if (err) reject(err)
            resolve({
                message: "El producto se ha actualizado correctamente"
            })
        });
    })
}

exports.eliminarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "DELETE FROM productos WHERE id_producto = ?";
        db.query(q, [id], (err) => {
            if (err) reject (err)
            resolve({
                message: "El producto se ha eliminado correctamente"})
        });
    })
}