const db = require('../../config/db');

exports.mostrarProveedores = (req, res) => {
    db.query(`SELECT 
        id_proveedor, 
        prov_nombre, 
        prov_direccion, 
        prov_telefono, 
        prov_correo
        FROM proveedores`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}