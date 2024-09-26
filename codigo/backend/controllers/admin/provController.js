const db = require('../../config/db');

exports.mostrarProveedores = (req, res) => {
    db.query("SELECT * FROM proveedores", (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}