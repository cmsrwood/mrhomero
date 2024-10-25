const db = require('../../config/db');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

exports.mostrarVentas = (req, res) => {
    db.query(`
        SELECT 
            id_venta, 
            DATE_FORMAT(venta_fecha, '%Y-%m-%d') AS venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total
        FROM ventas
    `, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.mostrarDetalleVenta = (req, res) => {
    db.query(`SELECT * from detalle_venta where id_detalle = ${req.params.id}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.crearVenta = (req, res) => {
    // Ventas
    const id_venta = `venta_${uuidv4()}`;
    const fecha = req.body.fecha;
    const id_user = req.body.id_user ? req.body.id_user : null;
    const metodo_de_pago = req.body.metodo_pago;
    const venta_total = req.body.total;

    if (!id_venta || !fecha || !metodo_de_pago || !venta_total) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const values = [id_venta, fecha, id_user, metodo_de_pago, venta_total];

    db.query('INSERT INTO ventas (id_venta, venta_fecha, id_user, venta_metodo_pago, venta_total) VALUES (?, ?, ?, ?, ?)', values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        return res.status(200).send('Venta creada exitosamente');
    });
}

exports.borrarVenta = (req, res) => {

    const id = req.params.id;

    db.query('DELETE FROM ventas WHERE id_venta = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Venta eliminada exitosamente');
        }
    });
}
