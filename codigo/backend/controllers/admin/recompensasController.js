const db = require('../../config/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../../frontend/public/images/recompensas/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `recompensa_${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage: storage });

// Función para eliminar una imagen de la carpeta
const eliminar = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/recompensas/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};


//Mostar todas las recompensas
exports.mostrarRecompensas = (req, res) => {
    const q = "SELECT * FROM recompensas";
    db.query(q, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    })
}

exports.mostrarPuntos = (req, res) => {
    const id = req.params.id;
    const q = "SELECT user_puntos FROM usuarios WHERE id_user = ?";
    db.query(q, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    })
}

// Configuración de Multer para subir una sola imagen

exports.upload = upload.single('foto');

//Crear una nueva recompensa
exports.crearRecompensa = (req, res) => {
    const nombre = req.body.recompensa_nombre;
    const descripcion = req.body.recompensa_descripcion;
    const puntos = req.body.recomp_num_puntos;
    const file = req.file;
    console.log('Datos recibidos:', req.body);

    const q = "INSERT INTO recompensas(`recompensa_nombre`, `recompensa_descripcion`, `recomp_num_puntos`, `recomp_foto`) VALUES (?)";
    const values = [
        nombre,
        descripcion,
        puntos,
        file.filename.toString()
    ];

    db.query(q, [values], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al ingresar los datos');
        } else {
            return res.status(200).send('Recompensa creada correctamente');
        }
    })
}

exports.reclamarRecompensa = (req, res) => {
    const id_recompensa = req.body.id_recompensa;
    const id_usuario = req.params.id_usuario;
    const values = [
        id_recompensa,
        id_usuario
    ];

    db.query("SELECT * FROM recompensas WHERE id_recomp = ?", [id_recompensa], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al ingresar los datos');
        }
        else {
            db.query('INSERT INTO recompensas_obt (`id_recomp`, `id_user`) VALUES (?)', [values], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error al ingresar los datos');
                } else {

                    const values2 = [
                        data[0].recomp_num_puntos,
                        id_usuario
                    ]

                    db.query('UPDATE user_puntos SET user_puntos = user_puntos - ? WHERE id_user = ?', [values2], (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error al ingresar los datos');
                        } else {
                            return res.status(200).send({ message: 'Recompensa reclamada correctamente' });
                        }
                    })
                }
            })
        }
    })
}

exports.actualizarRecompensa = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.recompensa_nombre;
    const descripcion = req.body.recompensa_descripcion;
    const puntos = req.body.recomp_num_puntos;
    const file = req.file || null;

    const qSelect = "SELECT * FROM recompensas WHERE id_recomp = ?";

    db.query(qSelect, [id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al ingresar los datos');
        } else if (data.length === 0) {
            return res.status(404).send('Recompensa no encontrada');
        }

        const recompensaActual = data[0];
        const nombreActualizado = nombre || recompensaActual.recompensa_nombre;
        const descripcionActualizada = descripcion || recompensaActual.recompensa_descripcion;
        const puntosActualizados = puntos || recompensaActual.recomp_num_puntos;
        const nombreFotoActualizado = file ? file.filename.toString() : recompensaActual.recomp_foto;
        if (file && recompensaActual.recomp_foto) {
            eliminar(recompensaActual.recomp_foto);
        }
        const qUpdate = "UPDATE recompensas SET recompensa_nombre = ?, recompensa_descripcion = ?, recomp_num_puntos = ?, recomp_foto = ? WHERE id_recomp = ?";

        const values = [
            nombreActualizado,
            descripcionActualizada,
            puntosActualizados,
            nombreFotoActualizado,
            id
        ];

        db.query(qUpdate, values, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Error al ingresar los datos' });
            } else {
                return res.status(200).send('Recompensa actualizada correctamente');
            }
        })
    })

}

exports.eliminarRecompensa = (req, res) => {
    const id = req.params.id;
    const qImagen = "SELECT recomp_foto FROM recompensas WHERE id_recomp = ?";

    db.query(qImagen, [id], async (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Recompensa no encontrada" });
        }

        const imagen = data[0].recomp_foto;
        if (imagen) {
            await eliminar(imagen);
        }

        const q = "DELETE FROM recompensas WHERE id_recomp = ?";
        db.query(q, [id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.json("La recompensa se ha eliminado correctamente");
        })
    })
}