const db = require('../../config/db');

exports.mostrarEmpleados = (req, res) => {

    db.query(`SELECT 
            id_user,
            user_nom,
            user_apels,
            user_email,
            user_tel,
            DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2`, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}
exports.asignarRol = (req, res) => {
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
        if (results.length <= 0) {
            return res.status(400).send({ title: `El usuario debe estar registrado en el sistema`, message: `El usuario ${correo} no existe` });
        }
        else {
            if (!nombre || !apellidos || !correo || !telefono || !fecha) {
                return res.status(400).send('Todos los campos son obligatorios');
            }
            db.query("UPDATE usuarios SET id_rol = 2, user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE user_email = ?", [nombre, apellidos, correo, telefono, fecha, correo], (err) => {
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
exports.EditarEmpleado = (req, res) => {
    const nombre = req.body.emp_nom_edit;
    const apellidos = req.body.emp_apellidos_edit;
    const correo = req.body.emp_email_edit;
    const telefono = req.body.emp_tel_edit;
    const fecha = req.body.emp_fecha_ingreso;

    db.query('SELECT * FROM usuarios WHERE user_email = ?', [correo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length < 0) {
            return res.status(400).send('El usuario no existe');
        }
        else {
            if (!nombre || !apellidos || !correo || !telefono || !fecha) {
                return res.status(400).send('Todos los campos son obligatorios');
            }
            db.query("UPDATE usuarios SET id_rol = 2, user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE user_email = ?", [nombre, apellidos, correo, telefono, fecha, correo], (err) => {
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
exports.EliminarEmpleado = (req, res) => {
    const id = req.params.id;
    db.query('UPDATE usuarios SET id_rol = 3  WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send('Empleado eliminado exitosamente');
        }
    });
}

exports.MostrarHorasEmpleadoMes = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;
    const idEmpleado = req.params.id;

    db.query(`SELECT
                DATE_FORMAT(hora_inicio, '%Y-%m-%d %H:%i:%s') AS hora_inicio,
                DATE_FORMAT(hora_fin, '%Y-%m-%d %H:%i:%s') AS hora_fin,
                FROM empleados_horas
                WHERE MONTH(hora_inicio) = ?
                AND YEAR(hora_inicio) = ?
                AND MONTH(hora_fin) = ?
                AND YEAR(hora_fin) = ?
                AND id_user = ?
                GROUP BY dia
                ORDER BY dia; `, [mes, ano, mes, ano, idEmpleado], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}

