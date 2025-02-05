//mostrar inventario
exports.mostrarInventario = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
            id_venta, 
            DATE_FORMAT(venta_fecha, '%Y-%m-%d / %H:%i:%s') AS venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total,
            venta_estado        
        FROM ventas`;
        global.db.query(q, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}

//Servicio para mostrar un producto del inventario
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

//Se verifica si el nombre del producto ya existe
exports.verificarNombre = async (nombre) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM inventario WHERE inv_nombre = ?";
        global.db.query(q, [nombre], (err, results) => {
            if (err) reject(err)
            resolve(results.length > 0);
        })
    })
}

//Crear productos para el inventario
exports.crearInventario = async (inventario) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO inventario (inv_nombre, id_categoria_inv, inv_cantidad, inv_fecha_ing, inv_fecha_cad, inv_cantidad_min, id_proveedor) VALUES (?)";
        const values = [
            inventario.nombre,
            inventario.id_categoria,
            inventario.cantidad,
            inventario.fecha_ingreso,
            inventario.fecha_caducidad,
            inventario.cantidad_min,
            inventario.id_proveedor
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err)
            resolve({
                id: results.insertId,
                inventario: inventario,
                message: "Se ha guardado con exito el producto."
            })
        })
    })
}

//Actualizar productos del inventario
exports.actualizarInventario = async (id, inventario) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE inventario SET inv_nombre = ?, id_categoria_inv = ?, inv_cantidad = ?, inv_fecha_ing = ?, inv_fecha_cad = ?, inv_cantidad_min = ? , id_proveedor = ? WHERE id_producto_inv = ?";
        const values = [
            inventario.nombre,
            inventario.id_categoria,
            inventario.cantidad,
            inventario.fecha_ingreso,
            inventario.fecha_caducidad,
            inventario.cantidad_min,
            inventario.id_proveedor,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: inventario.id,
                inventario: inventario,
                message: "Se ha actualizado con exito el producto."
            })
        })
    })
}

//Borrar productos del inventario
exports.borrarProductoInventario = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "DELETE FROM inventario WHERE id_producto_inv = ?";
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: id,
                message: "Se ha eliminado con exito el producto."
            })
        })
    })
}

//Mostrar categorias de los productos
exports.mostrarCategorias = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM categorias_inv";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

//Mostrar proveedores de los productos
exports.mostrarProveedores = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM proveedores";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

