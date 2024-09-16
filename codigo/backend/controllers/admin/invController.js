const db = require('../../config/db');

exports.mostrarInventario = (req, res) => {
    db.query(`
        SELECT 
            id_producto_inv, 
            inv_nombre, 
            id_categoria_inv, 
            DATE_FORMAT(inv_fecha_ing, '%Y-%m-%d') AS inv_fecha_ing, 
            DATE_FORMAT(inv_fecha_cad, '%Y-%m-%d') AS inv_fecha_cad, 
            inv_cantidad, 
            inv_cantidad_min, 
            id_proveedor 
        FROM inventario
    `, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.crearInventario = (req, res) => {
    const nombre = req.body.inv_nombre;
    const categoria = req.body.inv_categoria;
    const fechaIngreso = req.body.inv_fecha_ing;
    const fechaVencimiento = req.body.inv_fecha_cad;
    const cantidad = req.body.inv_cantidad;
    const cantidadMinima = req.body.inv_cantidad_min;
    const proveedor = req.body.id_proveedor;

    if (!nombre || !categoria || !fechaIngreso || !fechaVencimiento || !cantidad || !cantidadMinima || !proveedor) {
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
            const q = "INSERT INTO inventario (inv_nombre, id_categoria_inv, inv_cantidad, inv_fecha_ing, inv_fecha_cad, inv_cantidad_min, id_proveedor) VALUES (?, ?, ?, ?, ? ,?, ?)";
            db.query(q, [nombre, categoria, cantidad, fechaIngreso, fechaVencimiento, cantidadMinima, proveedor], (err, results) => {
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