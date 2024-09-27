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
exports.crearProveedor = (req, res) => {
    const nombre = req.body.prov_nombre;
    const direccion = req.body.prov_direccion;
    const encargado = req.body.prov_contacto_nombre;
    const telefono = req.body.prov_contacto_telefono;
    const correo = req.body.prov_contacto_email;



    if (!nombre || !direccion || !correo || !telefono || !encargado) {
        return res.status(400).send('Todos los campos son obligatorios');
    }
    const q = "INSERT INTO proveedores (`prov_nombre`, `prov_direccion`, `prov_contacto_nombre`, `prov_contacto_telefono`, `prov_contacto_email`) VALUES (?)";
    const values = [
        nombre,
        direccion,
        encargado,
        telefono,
        correo
    ];
    db.query(q, [values], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Proveedoredor creado exitosamente');
        }
    });
}
exports.borrarProveedor = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Proveedor eliminado exitosamente');
        }
    });
}
exports.actualizarProveedor = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.prov_nombre_edit;
    const direccion = req.body.prov_direccion_edit;
    const encargado = req.body.prov_contacto_nombre_edit;
    const telefono = req.body.prov_contacto_telefono_edit;
    const correo = req.body.prov_contacto_email_edit;
    db.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            if (!nombre || !direccion || !correo || !telefono || !encargado) {
                return res.status(400).send('Todos los campos son obligatorios');
            }
            const q = "UPDATE proveedores SET `prov_nombre` = ?, `prov_direccion` = ?, `prov_contacto_nombre` = ?, `prov_contacto_telefono` = ?, `prov_contacto_email` = ? WHERE `id_proveedor` = ?";
            const values = [
                nombre,
                direccion,
                encargado,
                telefono,
                correo,
                id
            ];
            db.query(q, [values], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error en el servidor');
                }
                else {
                    return res.status(200).send('Proveedoredor actualizado exitosamente');
                }
            });
        }
    });
}