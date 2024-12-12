const db = require('../config/db');

// Consulta todas las categorias
exports.mostrarCategorias = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias`;
        db.query(q, (error, results) => {
            if (error) reject(error)
            resolve(results)
        });
    })
}

// Consulta por categoria
exports.mostrarCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM categorias WHERE id_categoria = ?`;
        db.query(q, [id], (error, results) => {
            if (error) reject(error)
            resolve(results)
        });
    })
}

// Verificar si la categoria ya existe
const verificarNombre = async (categoria) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM categorias WHERE cat_nom = ?";
        db.query(q, [categoria], (error, results) => {
            if (error) reject(error)
            resolve(results.length > 0);
        });
    })
}

// Crear una nueva categoria
exports.crearCategoria = async (categoria, foto) => {

    const existe = await verificarNombre(categoria);

    if (existe) {
        return ({
            error: "La categoría ya existe",
            status: 400
        });
    }
    return new Promise((resolve, reject) => {

        const q = "INSERT INTO categorias (`cat_nom`, `cat_foto`) VALUES (?)";
        const values = [categoria, foto];

        db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha creado correctamente"
            })
        })
    })
}

// Traer categoria por id
const traerCategoria = async (id) => {
    return new Promise((resolve, reject) => {
        const qSelect = "SELECT cat_nom, cat_foto FROM categorias WHERE id_categoria = ?";
        db.query(qSelect, [id], (err, results) => {
            if (err) reject(err)
            resolve(results[0])
        })
    })
}

// Actualizar una categoria
exports.actualizarCategoria = async (id, foto, categoria) => {

    const categoriaActual = await traerCategoria(id);
    const existe = await verificarNombre(categoria);

    return new Promise((resolve, reject) => {

        if (existe) {
            return ({
                error: "La categoría ya existe",
                status: 400
            });
        }
        
        const nombreActualizado = categoria || categoriaActual.cat_nom;
        const nombreFotoActualizado = foto ? foto : categoriaActual.cat_foto;

        const qUpdate = "UPDATE categorias SET cat_nom = ?, cat_foto = ? WHERE id_categoria = ?";
        const values = [nombreActualizado, nombreFotoActualizado, id];

        db.query(qUpdate, values, (err) => {
            if (err) reject(err);
            resolve({
                message: "La categoría se ha actualizado correctamente"
            })
        })
    })
}

// Eliminar una categoria
exports.eliminarCategoria = async (id) => {
    return new Promise((reject, resolve) => {
        const q = "DELETE FROM categorias WHERE id_categoria = ?";
        db.query(q, [id], (err) => {
            if (err) reject(err)
            resolve({
                message: "La categoría se ha eliminado correctamente"
            });
        });
    });
}