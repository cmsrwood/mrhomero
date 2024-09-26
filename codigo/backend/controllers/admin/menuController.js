const db = require('../../config/db')
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images/menu/categorias')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        cb(null, `categoria_${Date.now()}.${ext}`);
    }
})

const upload = multer({ storage: storage })

function eliminar(image) {
    fs.unlink(`../frontend/public/images/menu/categorias/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.mostrarCategorias = (req, res) => {
    db.query(`SELECT * FROM categorias`, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error en el servidor')
        } else {
            return res.status(200).send(results)
        }
    });
};

exports.upload = upload.single('foto')

exports.crearCategoria = (req, res) => {
    const file = req.file;
    if (!file && !req.body.categoria) {
        return res.status(400).send('Debes completar todos los campos')
    }
    if (!file) {
        return res.status(400).send('Inserte una imagen')
    }
    else if (!req.body.categoria) {
        return res.status(400).send('Ingrese el nombre de la categoria')
    }

    const verificarNombre = "SELECT * FROM categorias WHERE cat_nom = ?";
    db.query(verificarNombre, [req.body.categoria], (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results.length > 0) {
            return res.status(400).send('La categoria ya existe')
        }
        const q = "INSERT INTO categorias (`cat_nom`, `cat_foto`) VALUES (?)"
        const values = [
            req.body.categoria,
            file.filename.toString()
        ]
        db.query(q, [values], (err) => {
            if (err) {
                console.log(err)
            }
            return res.json("La categoria ha sido creada")
        })
    })


}

exports.eliminarCategoria = (req, res) => {
    const id = req.params.id
    const qimagen = "SELECT cat_foto FROM categorias WHERE id_categoria = ?"
    db.query(qimagen, [id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        const imagen = data[0].cat_foto
        eliminar(imagen)

    })

    const q = "DELETE FROM categorias WHERE id_categoria = ?"
    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("La categoria se ha eliminado correctamente")
    })
}

exports.actualizarCategoria = (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const nuevoNombreCategoria = req.body.categoria;

    // Obtener la categoría existente para determinar qué campos deben actualizarse
    const qSelect = "SELECT cat_nom, cat_foto FROM categorias WHERE id_categoria = ?";
    db.query(qSelect, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        // Obtener el nombre y foto actual en la base de datos
        const categoriaActual = data[0];

        // Establecer los nuevos valores, manteniendo los existentes si no se envían
        const nombreActualizado = nuevoNombreCategoria || categoriaActual.cat_nom; 
        const nombreFotoActualizado = file ? file.filename.toString() : categoriaActual.cat_foto;

        // Eliminar la imagen anterior si se ha subido una nueva
        if (file) {
            eliminar(categoriaActual.cat_foto);
        }

        // Actualizar la categoría con los campos que hayan cambiado
        const qUpdate = "UPDATE categorias SET cat_nom = ?, cat_foto = ? WHERE id_categoria = ?";
        const values = [nombreActualizado, nombreFotoActualizado, id];

        db.query(qUpdate, values, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error actualizando la categoría" });
            }

            return res.json("La categoría ha sido actualizada correctamente");
        });
    });
};