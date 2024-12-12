const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

//PRODUCTOS
const storageProductos = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../../frontend/public/images/menu/productos/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `producto_${Date.now()}.${ext}`);
    }
})

const upload = multer({ storage: storageProductos })

exports.uploadProducto = upload.single('imagen');

//Eliminar de carpeta de productos 

const eliminarImagenProducto = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/menu/productos/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

//Mostrar todos los productos

exports.mostrarProductos = (req, res) => {
    const q = "SELECT * FROM productos";
    db.query(q, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

// Mostrar todos los productos por categoria

exports.mostrarProductosPorcategoria = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM productos where id_categoria = ?";
    db.query(q, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

// Mostrar un solo producto
exports.mostrarProducto = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM productos WHERE id_producto = ?";

    db.query(q, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(results[0]);
    });
};


// Crear un nuevo producto
exports.crearProducto = (req, res) => {
    const id_categoria = req.body.id_categoria;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const file = req.file;
    const puntos = req.body.puntos;

    if (!nombre || !descripcion || !precio || !file || !puntos || !id_categoria) {
        return res.status(400).send('Debes completar todos los campos.');
    } else if (!nombre) {
        return res.status(400).send('Ingrese el nombre del producto.');
    }
    else if (!descripcion) {
        return res.status(400).send('Ingrese la descripción del producto.');
    }
    else if (!puntos) {
        return res.status(400).send('Ingrese la cantidad de puntos.');
    }
    else if (!file) {
        return res.status(400).send('Inserte una imagen.');
    }
    else if (!puntos) {
        return res.status(400).send('Ingrese la cantidad de puntos.');
    }
    else if (!id_categoria) {
        return res.status(400).send('Seleccione una categoría.');
    }

    const verificarNombre = "SELECT * FROM productos WHERE pro_nom = ?";
    db.query(verificarNombre, [nombre], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: err, title: 'Error en el servidor', message: 'Intente nuevamente' });
        }
        if (results.length > 0) {
            return res.status(400).send({ error : err, title: 'El producto ya existe', message: 'Cambia el nombre del producto' });
        }

        const q = "INSERT INTO productos (`pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES (?)";
        const values = [
            nombre,
            descripcion,
            precio,
            file.filename.toString(),
            puntos,
            id_categoria
        ];

        db.query(q, [values], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ error: err, title: 'Error en el servidor', message: 'Intente nuevamente' });
            }

            return res.status(200).send({title : "Producto creado", message : "El producto se ha creado correctamente"});
        });
    });
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
