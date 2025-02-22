// Repositorio para mostrar todos los productos
exports.mostrarProductos = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Repositorio para mostrar un producto
exports.mostrarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos WHERE id_producto = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results[0]);
        });
    })
}

// Repositorio para mostrar los productos por categoria
exports.mostrarProductosPorCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM productos where id_categoria = ?`;
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve(results)
        });
    })
}

// Repositorio para verificar si el nombre del producto ya existe
exports.verificarNombre = async (nombre) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos WHERE pro_nom = ? AND pro_estado = 1";
        global.db.query(q, [nombre], (err, results) => {
            if (err) reject(err)
            resolve(results.length > 0);
        })
    })
}

// Repositorio para crear un producto
exports.crearProducto = async (producto) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO productos (`id_producto`, `pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES (?)";
        const values = [
            producto.id,
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
                message: "El producto se ha creado correctamente."
            })
        }
        )
    })
}


// Repositorio para actualizar un producto
exports.actualizarProducto = async (id, producto) => {
    const res = await this.mostrarProducto(id);
    const productoBaseDatos = res;
    return new Promise((resolve, reject) => {
        const qUpdate = `UPDATE productos SET pro_nom = ?, pro_desp = ?, pro_precio = ?, pro_foto = ?, pro_puntos = ? WHERE id_producto = ?`;
        const values = [
            producto.nombre ? producto.nombre : productoBaseDatos.pro_nom,
            producto.descripcion ? producto.descripcion : productoBaseDatos.pro_desp,
            producto.precio ? producto.precio : productoBaseDatos.pro_precio,
            producto.foto ? producto.foto : productoBaseDatos.pro_foto,
            producto.puntos ? producto.puntos : productoBaseDatos.pro_puntos,
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

// Repositorio para eliminar un producto
exports.eliminarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE productos SET pro_estado = 0 WHERE id_producto = ?";
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
                resolve({
            message: "El producto se ha borrado correctamente"
        })
    });
})
}

// Repositorio para actualizar el estado de un producto
exports.restaurarProducto = async (id) => {
    return new Promise((resolve, reject) => { 
        const q = "UPDATE productos SET pro_estado = 1 WHERE id_producto = ?";
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve({
                message: "El producto se ha restaurado correctamente"
            })
        });
    })
}