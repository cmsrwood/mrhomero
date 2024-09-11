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
    const nombre = req.body.inv_nombre;
    const categoria = req.body.inv_categoria;
    const fechaIngreso = req.body.inv_fecha_ing;
    const fechaVencimiento = req.body.inv_fecha_cad;
    const cantidad = req.body.inv_cantidad;
    const cantidadMinima = req.body.inv_cantidad_min;

    if (!nombre || !categoria || !fechaIngreso || !fechaVencimiento || !cantidad || !cantidadMinima) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const verificarNombre = "SELECT * FROM inventario WHERE inv_nombre = ?";
    db.query(verificarNombre, [nombre], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) {
            return res.status(400).send('El nombre ya existe');
        }
        else {
            const q = "INSERT INTO inventario (inv_nombre, inv_categoria, inv_cantidad, inv_fecha_ing, inv_fecha_cad, inv_cantidad_min) VALUES (?, ?, ?, ?, ? , ?)";
            db.query(q, [nombre, categoria, cantidad, fechaIngreso, fechaVencimiento], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error en el servidor');
                }
                else {
                    return res.status(200).send('Producto creado exitosamente');
                }
            });
        }
    });


}