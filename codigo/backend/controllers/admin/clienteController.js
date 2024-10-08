const db = require('../../config/db');
const moment = require('moment');

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
exports.borrarCliente = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM usuarios WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Cliente eliminado exitosamente');
        }
    });
}