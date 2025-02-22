
// Repositorio para mostrar todas las categorias
exports.mostrarCategorias = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias`;
        global.db.query(q, (error, results) => {
            if (error) reject(error)
            resolve(results)
        });
    })
}

// Repositorio para mostrar una categoria
exports.mostrarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias WHERE id_categoria = ?`;
        global.db.query(q, [id], (error, results) => {
            if (error) reject(error)
            resolve(results[0])
        });
    })
}

// Repositorio para verificar si la categoria ya existe
exports.verificarNombre = async (categoria) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM categorias WHERE cat_nom = ?";
        global.db.query(q, [categoria], (error, results) => {
            if (error) reject(error)
            resolve(results.length > 0);
        });
    })
}

// Repositorio para verificar si la categoria tiene productos
exports.verificarProductosPorCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM productos WHERE id_categoria = ? AND pro_estado = 1";
        global.db.query(q, [id], (error, results) => {
            if (error) reject(error)
            resolve(results.length > 0);
        });
    })
}

// Repositorio para crear una categoria
exports.crearCategoria = async (categoria) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO categorias (`id_categoria`, `cat_nom`, `cat_foto`) VALUES (?, ?, ?)";
        console.log(categoria)
        const values = [categoria.id, categoria.categoria, categoria.foto];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha creado correctamente"
            })
        })
    })
}

// Repositorio para actualizar una categoria
exports.actualizarCategoria = async (id, categoria) => {
    const res = await this.mostrarCategoria(id);
    const categoriaBaseDatos = res;

    return new Promise((resolve, reject) => {
        const q = "UPDATE categorias SET cat_nom = ?, cat_foto = ? WHERE id_categoria = ?";
        const values = [
            categoria.categoria ? categoria.categoria : categoriaBaseDatos.cat_nom,
            categoria.foto ? categoria.foto : categoriaBaseDatos.cat_foto,
            id
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha actualizado correctamente"
            })
        })
    })
}

// Repositorio para eliminar una categoria
exports.eliminarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE categorias SET cat_estado = 0 WHERE id_categoria = ?";
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve({
                message: "La categoría se ha eliminado correctamente"
            });
        });
    });
}

exports.restaurarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = "UPDATE categorias SET cat_estado = 1 WHERE id_categoria = ?";
        global.db.query(q, [id], (err, results) => {
            if (err) reject(err)
            resolve({
                message: "La categoría se ha restaurado correctamente"
            });
        });
    })
}