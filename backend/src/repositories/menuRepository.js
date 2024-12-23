
// Consulta todas las categorias
exports.mostrarCategorias = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias`;
        global.db.query(q, (error, results) => {
            if (error) reject(error)
            resolve(results)
        });
    })
}

// Consulta por categoria
exports.mostrarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias WHERE id_categoria = ?`;
        global.db.query(q, [id], (error, results) => {
            if (error) reject(error)
            resolve(results)
        });
    })
}

// Verificar si la categoria ya existe
exports.verificarNombre = async (categoria) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM categorias WHERE cat_nom = ?";
        global.db.query(q, [categoria], (error, results) => {
            if (error) reject(error)
            resolve(results.length > 0);
        });
    })
}

// Crear una nueva categoria
exports.crearCategoria = async (categoria, foto) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO categorias (`cat_nom`, `cat_foto`) VALUES (?)";
        const values = [categoria, foto];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha creado correctamente"
            })
        })
    })
}

// Actualizar una categoria
exports.actualizarCategoria = async (id, foto, categoria) => {
    return new Promise((resolve, reject) => {
        const qUpdate = "UPDATE categorias SET cat_nom = ?, cat_foto = ? WHERE id_categoria = ?";
        const values = [categoria, foto, id];
        global.db.query(qUpdate, values, (err) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha actualizado correctamente"
            })
        })
    })
}

// Eliminar una categoria
exports.eliminarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "DELETE FROM categorias WHERE id_categoria = ?";
        global.db.query(q, [id], (err) => {
            if (err) reject(err)
            resolve({
                message: "La categoría se ha eliminado correctamente"
            });
        });
    });
}