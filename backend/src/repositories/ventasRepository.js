const { v4: uuidv4 } = require('uuid');

// Mostrar una venta
exports.mostrarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM ventas WHERE id_venta = '${id}'`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar ventas
exports.mostrarVentas = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM ventas`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar detalle de venta
exports.mostrarDetalleVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM detalle_ventas WHERE id_venta = '${id}'`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar productos mas vendidos
exports.mostrarProductosMasVendidos = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT p.pro_nom,
                p.pro_foto,
                SUM(dv.cantidad_producto) AS cantidad_vendida
                FROM detalle_ventas dv
                JOIN productos p ON dv.id_producto = p.id_producto
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE MONTH(v.venta_fecha) = ${mes}
                AND YEAR(v.venta_fecha) = ${ano}
                GROUP BY p.pro_nom
                ORDER BY cantidad_vendida DESC;`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar cantidad de productos vendidos por mes
exports.mostrarCuentaProductosVendidosPorMes = async (mes, ano) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT
                SUM(dv.cantidad_producto) AS cantidad
                FROM detalle_ventas dv
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE MONTH(v.venta_fecha) = ${mes}
                AND YEAR(v.venta_fecha) = ${ano};`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar cantidad y precio de ventas
exports.cantidadPrecioVentas = async (mes, ano) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT
                SUM(venta_total) AS total
                FROM ventas
                WHERE MONTH(venta_fecha) = ${mes}
                AND YEAR(venta_fecha) = ${ano};`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar ventas mensuales
exports.ventasMensuales = async (mes, ano) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                DATE_FORMAT(venta_fecha, '%d') AS dia, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE MONTH(venta_fecha) = ${mes} AND YEAR(venta_fecha) = ${ano}
                GROUP BY dia
                ORDER BY dia;`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Crear venta
exports.crearVenta = async (venta) => {
    return new Promise((resolve, reject) => {

        const id_venta = `venta_${uuidv4()}`;
        const q = `INSERT INTO ventas (id_venta, venta_fecha, id_user, venta_metodo_pago, venta_total) VALUES (?)`;

        const values = [
            id_venta,
            venta.venta_fecha,
            venta.id_user,
            venta.venta_metodo_pago,
            venta.venta_total
        ];
        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                id: id_venta,
                venta: venta,
                message: "Venta creada exitosamente",
            });
        });
    })
}

// Crear detalle de venta
exports.crearDetalleVenta = async (detalle) => {
    return new Promise((resolve, reject) => {

        const q = `INSERT INTO detalle_ventas (id_venta, id_producto, cantidad_producto, precio_unitario, subtotal) VALUES (?)`;

        const values = [
            detalle.id_venta,
            detalle.id_producto,
            detalle.cantidad,
            detalle.precio_unitario,
            detalle.subtotal
        ];

        global.db.query(q, [values], (err, results) => {
            if (err) reject(err);
            resolve({
                id: results.insertId,
                detalle: detalle,
                message: "Detalle de venta creado exitosamente",
            });
        });
    })
}

exports.generarPDFVentasMensuales = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                DATE_FORMAT(venta_fecha, '%d') AS dia, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE MONTH(venta_fecha) = ${mes} AND YEAR(venta_fecha) = ${ano}
                GROUP BY dia
                ORDER BY dia;`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

exports.generarPDFVentasAnual = async (ano) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                MONTH(venta_fecha) AS mes, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE YEAR(venta_fecha) = ${ano}
                GROUP BY mes
                ORDER BY mes;`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

exports.borrarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE ventas SET venta_estado = 0  WHERE id_venta = ${id}`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

exports.restaurarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE ventas SET venta_estado = 1  WHERE id_venta = ${id}`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

exports.mostrarCompras = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT 
            id_venta, 
            venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total,
            venta_estado
        FROM ventas
        WHERE id_user = ${id}
    `;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

exports.mostrarProductosMasCompradosPorCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT 
            p.pro_nom, 
            SUM(dv.cantidad_producto) AS cantidad_vendida
        FROM detalle_ventas dv
        JOIN ventas v ON dv.id_venta = v.id_venta
        JOIN productos p ON dv.id_producto = p.id_producto
        WHERE v.id_user = ${id}
        GROUP BY p.pro_nom
        ORDER BY cantidad_vendida DESC;
    `;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}