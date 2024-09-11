const db = require('../../../config/db');

exports.mostrarEmpleados = (req, res) => {


    db.query('SELECT * FROM usuarios WHERE id_rol = 2', (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else{
            return res.status(200).send(results);
        }
    });
}
