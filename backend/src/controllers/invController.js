const invServices = require('../services/invServices');
exports.mostrarInventario = async (req, res, next) => {
    try {
        const inventario = await invServices.mostrarInventario();
        res.status(200).json(inventario);
    } catch (error) {
        next(error)
    }
};

exports.crearInventario = async (req, res, next) => {
    try {
        const response = await invServices.crearInventario(req.body);
        res.status(200).send(response);
    } catch (error) { 
        res.status(500).send({ error: 'Error creando ingrediente' });
    }
};

exports.borrarInventario = (req, res) => {

    const id = req.params.id;

    db.query('DELETE FROM inventario WHERE id_producto_inv = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Ingrediente eliminado exitosamente');
        }
    });
}
exports.actualizarInventario = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.inv_nombre;
    const categoria = req.body.id_categoria_inv;
    const fechaIngreso = req.body.inv_fecha_ing;
    const fechaVencimiento = req.body.inv_fecha_cad;
    const cantidad = req.body.inv_cantidad;
    const cantidadMinima = req.body.inv_cantidad_min;
    const proveedor = req.body.id_proveedor;

    db.query('SELECT * FROM inventario WHERE id_producto_inv = ?', [id], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length === 0) {
            return res.status(400).send('Ingrediente no encontrado');
        }
        if (results[0].id_proveedor == proveedor && results[0].inv_nombre == nombre && results[0].id_categoria_inv == categoria && results[0].inv_cantidad == cantidad && results[0].inv_cantidad_min == cantidadMinima && results[0].inv_fecha_ing == fechaIngreso && results[0].inv_fecha_cad == fechaVencimiento) {
            return res.status(400).send('No has modificado el ingrediente');
        }

        if (!nombre || !categoria || !fechaIngreso || !fechaVencimiento || !cantidad || !cantidadMinima || !proveedor) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const q = "UPDATE inventario SET inv_nombre = ?, id_categoria_inv = ?, inv_cantidad = ?, inv_fecha_ing = ?, inv_fecha_cad = ?, inv_cantidad_min = ? , id_proveedor = ? WHERE id_producto_inv = ?";

        db.query(q, [nombre, categoria, cantidad, fechaIngreso, fechaVencimiento, cantidadMinima, proveedor, id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error en el servidor');
            }
            else {
                return res.status(200).send('Ingrediente actualizado exitosamente');
            }
        });
    });


}

exports.mostrarCategorias = (req, res) => {
    db.query('SELECT * FROM categorias_inv', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
};

exports.mostrarProveedores = (req, res) => {
    db.query('SELECT * FROM proveedores', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    });
}