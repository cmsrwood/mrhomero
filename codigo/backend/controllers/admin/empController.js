const db = require('../../config/db');

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
exports.asignarRol =(req,res)=>{
    const nombre = req.body.emp_nom;
    const apellidos = req.body.emp_apellidos;
    const correo = req.body.emp_email;
    const telefono = req.body.emp_tel;
    const fecha = req.body.emp_fecha_ingreso;

    db.query('SELECT * FROM usuarios WHERE user_email = ?', [correo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else{
            if (!nombre || !apellidos || !correo || !telefono || !fecha) {
                return res.status(400).send('Todos los campos son obligatorios');
            }
            const q = "UPDATE usuarios SET user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ?, id_rol = 2 WHERE user_email = ?";
            const values = [
                nombre,
                apellidos,
                correo,
                telefono,
                fecha,
                correo
            ];
            db.query(q, [values], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error en el servidor');
                } else {
                    return res.status(200).send('Empleado creado exitosamente');
                }
            });
        }
    });
}
