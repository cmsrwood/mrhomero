const db = require('../../config/db');
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
        cb(null, `recompensa_${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage: storage });

// Función para eliminar una imagen de la carpeta
const eliminar = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/clientes                                      /${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};
exports.actualizarCliente = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.cliente_nombre;
    const apellido = req.body.cliente_apellido;
    const email = req.body.cliente_email;
    const telefono = req.body.cliente_telefono;

    db.query('SELECT * FROM usuarios WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            if (results.length === 0) {
                return res.status(404).send('Cliente no encontrado');
            }
            else {
                db.query('UPDATE usuarios SET user_nom = ?, user_apels = ?, user_email = ?, user_tel = ? WHERE id_user = ?', [nombre, apellido, email, telefono, id], (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error en el servidor');
                    }
                    else {
                        return res.status(200).send('Cliente actualizado exitosamente');
                    }
                });
            }
        }
    }
    );}

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