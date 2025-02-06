const recompensasServices = require('../services/recompensasServices');

// Mostar todas las recompensas
exports.mostrarRecompensas = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensas();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Mostrar una recompensa
exports.mostrarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensa(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// Mostrar recompensas obtenidas
exports.mostrarRecompensasObtenidas = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensasObtenidas();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Mostrar recompensas obtenidas por usuario
exports.mostrarRecompensasObtenidasPorUsuario = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarRecompensasObtenidasPorUsuario(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// Mostrar puntos por usuario
exports.mostrarPuntos = async (req, res, next) => {
    try {
        const response = await recompensasServices.mostrarPuntos(req.params.id);
        res.status(200).json(response);
    }
    catch (error) {
        next(error)
    }
}

//Crear una nueva recompensa
exports.crearRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.crearRecompensa(req.body)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

exports.reclamarRecompensa = (req, res) => {

    const id_recompensa = req.body.id_recompensa;
    const id_usuario = req.params.id_usuario;
    const fecha_reclamo = moment().format('YYYY-MM-DD HH:mm:ss');
    function codigo() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const values = [
        id_recompensa,
        id_usuario,
        codigo(),
        fecha_reclamo
    ];

    db.query("SELECT * FROM recompensas WHERE id_recomp = ?", [id_recompensa], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al ingresar los datos');
        }
        if (data.length === 0) {
            return res.status(404).send('Recompensa no encontrada');
        }

        else {
            db.query('INSERT INTO recompensas_obt (`id_recomp`, `id_user`, `codigo`, `fecha_reclamo`) VALUES (?)', [values], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error al ingresar los datos');
                } else {

                    const puntosRecompensa = data[0].recomp_num_puntos;

                    db.query('UPDATE usuarios SET user_puntos = user_puntos - ? WHERE id_user = ?', [puntosRecompensa, id_usuario], (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error al ingresar los datos');
                        } else {
                            return res.status(200).send({ title: 'Recompensa reclamada', message: `El codigo de la recompensa es: ${values[2]}` });
                        }
                    })
                }
            })
        }
    })
}

exports.actualizarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.actualizarRecompensa(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.validarRecompensa = (req, res) => {
    const id = req.params.id;
    const codigo = req.body.codigo;

    const q = "SELECT * FROM recompensas_obt WHERE id_recomp_obt = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al ingresar los datos');
        } else {
            if (data.length === 0) {
                return res.status(404).send('Recompensa no encontrada');
            }

            else {
                const recompensa = data[0];

                if (recompensa.estado == 0) {
                    return res.status(404).send({ title: 'Recompensa ya validada', message: 'La recompensa ya ha sido validada' });
                }

                if (recompensa.codigo !== codigo) {
                    return res.status(404).send({ title: 'Codigo incorrecto', message: `El codigo que proporcionaste no es valido ` });
                }

                q2 = "UPDATE recompensas_obt SET estado = 0 WHERE id_recomp_obt = ? AND codigo = ?";

                db.query(q2, [id, codigo], (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error al ingresar los datos');
                    } else {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error al ingresar los datos');
                        } else {
                            return res.status(200).send({ title: 'Recompensa validada correctamente', message: '¡Ya puedes entregar la recompensa al cliente!' });
                        }
                    }
                })
            }
        }
    })
}

exports.eliminarRecompensa = async (req, res, next) => {
    try {
        const response = await recompensasServices.eliminarRecompensa(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}