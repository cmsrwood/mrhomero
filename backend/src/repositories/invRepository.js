// Repositorio para mostrar inventario
exports.mostrarInventario = async () => {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT 
            id_producto_inv, 
            inv_nombre, 
            categoria_inv_nom,
            DATE_FORMAT(inv_fecha_ing, '%Y-%m-%d') AS inv_fecha_ing, 
            DATE_FORMAT(inv_fecha_cad, '%Y-%m-%d') AS inv_fecha_cad, 
            inv_cantidad, 
            inv_cantidad_min, 
            id_proveedor 
        FROM inventario
    `;
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para mostrar un producto del inventario
exports.mostrarProductoInventario = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM `inventario` WHERE `id_producto_inv` = ?";
        const values = [id]
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Repositorio para verificar si el nombre del producto ya existe
exports.verificarNombre = async (nombre) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM inventario WHERE inv_nombre = ?";
        global.db.query(q, [nombre], (err, results) => {
            if (err) reject(err)
            resolve(results.length > 0);
        })
    })
}

// Repositorio para crear productos para el inventario
exports.crearInventario = async (inventario) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO inventario (inv_nombre, categoria_inv_nom, inv_cantidad, inv_fecha_ing, inv_fecha_cad, inv_cantidad_min, id_proveedor) VALUES (?)";
        const values = [
            inventario.inv_nombre,
            inventario.categoria_inv_nom,
            inventario.inv_cantidad,
            inventario.inv_fecha_ing,
            inventario.inv_fecha_cad,
            inventario.inv_cantidad_min,
            inventario.id_proveedor
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err)
            resolve({
                id: results.insertId,
                inventario: inventario,
                message: "El producto se ha creado con exito."
            })
        })
    })
}

// Repositorio para actualizar productos del inventario
exports.actualizarInventario = async (id, inventario) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE inventario SET inv_nombre = ?, categoria_inv_nom = ?, inv_cantidad = ?, inv_fecha_ing = ?, inv_fecha_cad = ?, inv_cantidad_min = ? , id_proveedor = ? WHERE id_producto_inv = ?";
        const values = [
            inventario.inv_nombre,
            inventario.categoria_inv_nom,
            inventario.inv_cantidad,
            inventario.inv_fecha_ing,
            inventario.inv_fecha_cad,
            inventario.inv_cantidad_min,
            inventario.id_proveedor,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: inventario.id,
                inventario: inventario,
                message: "El producto se ha actualizado con exito."
            })
        })
    })
}

// Repositorio para eliminar productos del inventario
exports.eliminarProductoInventario = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "DELETE FROM inventario WHERE id_producto_inv = ?";
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: id,
                message: "El producto se ha eliminado con exito."
            })
        })
    })
}