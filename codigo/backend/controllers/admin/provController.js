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
exports.crearProveedores = (req, res) => {
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