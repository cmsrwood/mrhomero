const db = require('../config/db');

exports.mostrarInventario = (req, res) => {

    db.query('SELECT * FROM inventario', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}
exports.crearInventario = (req, res) => {
}