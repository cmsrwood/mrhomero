const clientesServices = require('../services/clientesServices')

exports.actualizarCliente = async (req, res, next) => {
    try {
        const response = await clientesServices.actualizarCliente(req.params.id, req.body);
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await clientesServices.mostrarClientes();
        res.status(200).json(clientes);
    } catch (error) {
        next(error)
    }
};

exports.mostrarCuentaClientesUltimoMes = (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 3 AND MONTH(user_fecha_registro) = MONTH(CURRENT_DATE) AND YEAR(user_fecha_registro) = YEAR(CURRENT_DATE)', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');
        }
        else {
            return res.status(200).json(results);
        }
    });
}

exports.agregarPuntos = (req, res) => {
    const id = req.params.id;
    const puntos = req.body.puntos;

    db.query('UPDATE usuarios SET user_puntos = user_puntos + ? WHERE id_user = ?', [puntos, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');

        }
        else {
            return res.status(200).json({
                message: 'Puntos agregados exitosamente',
            });
        }
    });
}

exports.borrarCliente = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE usuarios SET user_estado = 0  WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');

        }
        else {
            return res.status(200).json('Cliente eliminado exitosamente');
        }
    });
}


exports.restaurarCliente = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE usuarios SET user_estado = 1  WHERE id_user = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error en el servidor');

        }
        else {
            return res.status(200).json('Cliente restaurado exitosamente');
        }
    });
}
exports.mostrarCliente = async (req, res, next) => {
    try {
        const response = await clientesServices.mostrarCliente(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }

};
