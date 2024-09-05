const db = require('../config/db');

exports.inventarioCrear = (req, res) => {
    const nombre = req.body.inv_nombre;
    const categoria = req.body.inv_categoria;
    const fechaIng = req.body.inv_fecha_ing;
    const fechaCad = req.body.inv_fecha_cad;
    const cantidad = req.body.inv_cantidad;
    db.query('SELECT * FROM inventario WHERE inv_nombre = ?', [nombre], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            return res.status(400).send('El nombre ya existe');
        }

        db.query('INSERT INTO inventario (inv_nombre, inv_categoria, inv_fech_ing, inv_fech_cad, inv_cantidad) VALUES (?, ?, ?, ? , ?)', [nombre, categoria, fechaIng, fechaCad, cantidad], (err) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).send('Error en el servidor');
            }

            res.status(200).send('Inventario creado con exito');
        });
    });
}