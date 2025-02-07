
exports.mostrarEmpleados = (req, res) => {

    db.query(`SELECT 
            id_user,
            user_nom,
            user_apels,
            user_email,
            user_tel,
            user_foto,
            DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2`, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        }
        else {
            return res.status(200).json(results);
        }
    });
}

exports.mostrarEmpleadoId = (req, res) => {

    db.query(`SELECT 
            id_user,
            user_nom,
            user_apels,
            user_email,
            user_tel,
            user_foto,
            DATE_FORMAT(user_fecha_registro, '%Y-%m-%d') AS user_fecha_registro FROM usuarios WHERE id_rol = 2 AND id_user = ${req.params.id}`, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        }
        else {
            return res.status(200).json(results[0]);
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
            return res.status(500).json('Error en el servidor');
        }
        if (results.length <= 0) {
            return res.status(400).json({ title: `El usuario debe estar registrado en el sistema`, message: `El usuario ${correo} no existe` });
        }
        else {
            if (!nombre || !apellidos || !correo || !telefono || !fecha) {
                return res.status(400).json('Todos los campos son obligatorios');
            }
            db.query("UPDATE usuarios SET id_rol = 2, user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE user_email = ?", [nombre, apellidos, correo, telefono, fecha, correo], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json('Error en el servidor');
                } else {
                    return res.status(200).json('Empleado creado exitosamente');
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
            return res.status(500).json('Error en el servidor');
        }
        if (results.length < 0) {
            return res.status(400).json('El usuario no existe');
        }
        else {
            if (!nombre || !apellidos || !correo || !telefono || !fecha) {
                return res.status(400).json('Todos los campos son obligatorios');
            }
            db.query("UPDATE usuarios SET id_rol = 2, user_nom = ?, user_apels = ?, user_email = ?, user_tel = ?, user_fecha_registro = ? WHERE user_email = ?", [nombre, apellidos, correo, telefono, fecha, correo], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json('Error en el servidor');
                } else {
                    return res.status(200).json('Empleado creado exitosamente');
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
            return res.status(500).json('Error en el servidor');

        }
        else {
            return res.status(200).json('Empleado eliminado exitosamente');
        }
    });
}

exports.MostrarHorasEmpleadoMes = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;
    const idEmpleado = req.params.id;

    db.query(`SELECT
                DATE_FORMAT(hora_inicio, ' %Y-%m-%d %H:%i:%s') AS hora_inicio,
                DATE_FORMAT(hora_fin, '%Y-%m-%d %H:%i:%s') AS hora_fin,
                fecha
                FROM empleados_horas
                WHERE MONTH(hora_inicio) = ?
                AND YEAR(hora_inicio) = ?
                AND MONTH(hora_fin) = ?
                AND YEAR(hora_fin) = ?
                AND id_user = ?
                GROUP BY fecha
                ORDER BY fecha; `, [mes, ano, mes, ano, idEmpleado], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error en el servidor' });
        } else {
            return res.status(200).json(results);
        }
    });
}
exports.horaInicio = (req, res) => {
    const idEmpleado = req.params.id;
    const horaInicio = req.body.hora_inicio;
    const fecha = req.body.fecha;

    db.query('INSERT INTO empleados_horas (id_user,fecha, hora_inicio) VALUES (?,?, ?)', [idEmpleado, fecha, horaInicio], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        } else {
            return res.status(200).json('Horas agregadas exitosamente');
        }
    }
    );
}
exports.horaFin = (req, res) => {
    const idEmpleado = req.params.id;
    const horaFin = req.body.hora_fin;
    const fecha = req.body.fecha;

    db.query('UPDATE empleados_horas SET hora_fin = ? WHERE id_user = ? AND fecha = ?', [horaFin, idEmpleado, fecha], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        } else {
            return res.status(200).json('Horas agregadas exitosamente');
        }
    }
    );
}
exports.horasDia = (req, res) => {
    const idEmpleado = req.params.id;
    const fecha = req.params.fecha;

    db.query('SELECT * FROM empleados_horas WHERE id_user = ? AND fecha = ?', [idEmpleado, fecha], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        } else {
            return res.status(200).json(results[0]);
        }
    });
}

exports.horasPorMes = (req, res) => {
    const idEmpleado = req.params.id;
    const mes = req.params.mes;
    const ano = req.params.ano;

    db.query('SELECT SUM(HOUR(hora_fin) - HOUR(hora_inicio)) as horas from  empleados_horas WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND id_user = ?', [mes, ano, idEmpleado], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        } else {
            return res.status(200).json(results);
        }
    });
}

