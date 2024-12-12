const moment = require('moment');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../../frontend/public/images/clientes/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `cliente_${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage: storage });

// Función para eliminar una imagen de la carpeta
const eliminar = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/clientes/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

exports.actualizarCliente = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.usuario_nombre;
    const apellido = req.body.usuario_apellidos;
    const telefono = req.body.usuario_telefono;
    const file = req.file || null;

    const qCliente = 'SELECT * FROM usuarios WHERE id_user = ?'
    db.query(qCliente, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        const clienteActual = results[0];
        const nombreActualizado = nombre || clienteActual.user_nom;
        const apellidoActualizado = apellido || clienteActual.user_apels;
        const telefonoActualizado = telefono || clienteActual.user_tel;
        const fotoActualizada = file ? file.filename.toString() : clienteActual.user_foto;

        const q = 'UPDATE usuarios SET user_nom = ?, user_apels = ?, user_tel = ?, user_foto = ? WHERE id_user = ?';

        const values = [
            nombreActualizado,
            apellidoActualizado,
            telefonoActualizado,
            fotoActualizada,
            id
        ];

        db.query(q, values, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al editar el usuario' + err);
            } else {
                eliminar(clienteActual.user_foto);
                return res.status(200).send({
                    title: 'Exito',
                    message: 'Tus datos se han actualizado exitosamente',
                });
            }
        })
    })
}
exports.upload = upload.single('foto');


exports.mostrarClientes = (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 3', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}

exports.mostrarCuentaClientesUltimoMes = (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 3 AND MONTH(user_fecha_registro) = MONTH(CURRENT_DATE) AND YEAR(user_fecha_registro) = YEAR(CURRENT_DATE)', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}

exports.agregarPuntos = (req, res) => {
    const id = req.params.id;
    const puntos = req.body.puntos;

    db.query('UPDATE usuarios SET user_puntos = user_puntos + ? WHERE id_user = ?', [puntos, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send({
                message: 'Puntos agregados exitosamente',
            });
        }
    });
}

exports.borrarCliente = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE usuarios SET user_estado = 0  WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send('Cliente eliminado exitosamente');
        }
    });
}


exports.restaurarCliente = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE usuarios SET user_estado = 1  WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send('Cliente restaurado exitosamente');
        }
    });
}
exports.mostrarClientesByid = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM usuarios WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) {
            return res.status(200).send(results[0]);
        } else {
            return res.status(404).send('Usuario no encontrado');
        }
    });
};
