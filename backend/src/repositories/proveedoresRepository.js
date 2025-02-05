// Mostrar todos los proveedores
exports.mostrarProveedores = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM proveedores";
        global.db.query(q, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Mostrar un proveedor
exports.mostrarProveedor = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM proveedores WHERE id_proveedor = ?";
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

// Crear proveedor
exports.crearProveedor = async (proveedor) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO proveedores (`prov_nombre`, `prov_direccion`, `prov_contacto_nombre`, `prov_contacto_telefono`, `prov_contacto_email`) VALUES (?)";
        const values = [
            proveedor.empresa,
            proveedor.direccion,
            proveedor.encargado,
            proveedor.telefono,
            proveedor.correo
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err)
            resolve({
                id: results.insertId,
                proveedor: proveedor,
                message: "Proveedor creado con exito."
            })
        })
    })
}

// Actualizar proveedor
exports.actualizarProveedor = async (id, proveedor) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE proveedores SET prov_nombre = ?, prov_direccion = ?, prov_contacto_nombre = ?, prov_contacto_telefono = ?, prov_contacto_email = ? WHERE id_proveedor = ?";
        const values = [
            proveedor.empresa,
            proveedor.direccion,
            proveedor.encargado,
            proveedor.telefono,
            proveedor.correo,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err)
            resolve({
                id: proveedor.id,
                proveedor: proveedor,
                message: "Proveedor actualizado con exito."
            })
        })
    })
}

// Borrar proveedor
exports.borrarProveedor = async (id) => { 
    return new Promise((resolve, reject) => { 
        const q = "DELETE FROM proveedores WHERE id_proveedor = ?";
        const values = [id];
        global.db.query(q, values, (err, results) => { 
            if (err) reject(err)
            resolve({
                id: id,
                message: "Proveedor eliminado con exito."
            })
        })
    })
}