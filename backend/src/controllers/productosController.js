const productosServices = require('../services/productosServices');

exports.mostrarProductos = (req, res) => {
    try {
        const response = productosServices.mostrarProductos();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo productos' });
    }
};

// Mostrar todos los productos por categoria

exports.mostrarProductosPorcategoria = (req, res) => {
    try {
        const response = productosServices.mostrarProductosPorCategoria(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo productos por categoria' });
    }
};

// Mostrar un solo producto
exports.mostrarProducto = (req, res) => {
    try {
        const response = productosServices.mostrarProducto(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Error obteniendo producto' });
    }
};


// Crear un nuevo producto
exports.crearProducto = (req, res) => {
try {
    const response = productosServices.crearProducto(req.body.nombre, req.body.descripcion, req.body.precio, req.body.foto, req.body.puntos, req.body.id_categoria);
    res.status(200).send(response)
} catch(error) {
    res.status(500).send({ error: 'Error creando producto' });
}


};

// Actualizar una categoría
exports.actualizarProducto = (req, res) => {
    const id = req.params.id;
    console.log(id)
    const file = req.file;
    console.log(file)
    const nombre = req.body.nombre || null;
    console.log(nombre)
    const descripcion = req.body.descripcion || null;
    console.log(descripcion)
    const precio = req.body.precio || null;
    console.log(precio)
    const puntos = req.body.puntos || null;
    console.log(puntos)

    const qSelect = "SELECT * FROM productos WHERE id_producto = ?";

    db.query(qSelect, [id], (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (data.length === 0) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        const productoActual = data[0];
        const nombreActualizado = nombre || productoActual.pro_nom;
        const descripcionActualizada = descripcion || productoActual.pro_desp;
        const precioActualizado = precio || productoActual.pro_precio;
        const puntosActualizados = puntos || productoActual.pro_puntos;
        const nombreFotoActualizado = file ? file.filename.toString() : productoActual.pro_foto;

        if (file && productoActual.pro_foto) {
            eliminarImagenProducto(productoActual.pro_foto);
        }

        const qUpdate = `UPDATE productos SET pro_nom = ?, pro_desp = ?, pro_precio = ?, pro_foto = ?, pro_puntos = ? WHERE id_producto = ?`;

        const values = [
            nombreActualizado,
            descripcionActualizada,
            precioActualizado,
            nombreFotoActualizado,
            puntosActualizados,
            id
        ];

        db.query(qUpdate, values, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Error editando el producto" });
            }
            return res.send("El producto se ha editado correctamente");
        });
    });
};

// Borrar un producto
exports.borrarProducto = (req, res) => {
    const id = req.params.id;
    const qimagen = "SELECT pro_foto FROM productos WHERE id_producto = ?";

    db.query(qimagen, [id], async (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (data.length === 0) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        const imagen = data[0].pro_foto;
        if (imagen) {
            await eliminarImagenProducto(imagen);
        }

        const q = "DELETE FROM productos WHERE id_producto = ?";
        db.query(q, [id], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.json("El producto se ha eliminado correctamente");
        });
    });
};
