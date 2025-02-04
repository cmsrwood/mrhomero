// Mostrar todos los productos
exports.mostrarProductos = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Mostrar los productos por categoria
exports.mostrarProductosPorCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos where id_categoria = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Mostrar un producto
exports.mostrarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos WHERE id_producto = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results);
        });
    })
}

// Verificar si el nombre del producto ya existe
exports.verificarNombre = async (nombre) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos WHERE pro_nom = ?";
        global.db.query(q, [nombre], (err, results) => {
            if (err) reject(err)
            resolve(results.length > 0);
        })
    })
}

// Crear un producto
exports.crearProducto = async (producto) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO productos (`pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES (?)";
        const values = [
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.foto,
            producto.puntos,
            producto.id_categoria
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                id: results.insertId,
                producto: producto,
                message: "El producto se ha creado correctamente."
            })
        }
        )
    })
}

// Actualizar un producto

exports.actualizarProducto = async (id, producto) => {
    return new Promise((resolve, reject) => {
        const qUpdate = `UPDATE productos SET pro_nom = ?, pro_desp = ?, pro_precio = ?, pro_foto = ?, pro_puntos = ? WHERE id_producto = ?`;
        const values = [
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.foto,
            producto.puntos,
            id
        ];
        global.db.query(qUpdate, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: id,
                producto: producto,
                message: "El producto se ha actualizado correctamente"
            })
        });
    })
}

// Eliminar un producto
exports.eliminarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "DELETE FROM productos WHERE id_producto = ?";
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve({
                message: "El producto se ha eliminado correctamente"
            })
        });
    })
}