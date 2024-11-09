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
        if (file && recompensaActual.recomp_foto) {
            eliminar(recompensaActual.recomp_foto);
        }
        const qUpdate = "UPDATE recompensas SET recompensa_nombre = ?, recompensa_descripcion = ?, recomp_num_puntos = ?, recomp_foto = ? WHERE id_recomp = ?";

        const values = [
            nombre,
            descripcion,
            puntos,
            file,
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

}