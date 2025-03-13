const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// Mostrar ventas
exports.mostrarVentas = async () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
            id_venta, 
            DATE_FORMAT(venta_fecha, '%Y-%m-%d / %H:%i:%s') AS venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total,
            venta_estado
        FROM ventas`;
        global.db.query(q, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar una venta
exports.mostrarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM ventas WHERE id_venta = ?`;
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}


// Mostrar compras
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
        WHERE id_user = ?
        AND venta_estado = 1
        `;
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar detalle de venta
exports.mostrarDetalleVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM detalle_ventas WHERE id_venta = ?`;
        const values = [id];
        global.db.query(q, values, (err, results) => {
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
                WHERE YEAR(v.venta_fecha) = ?
                AND MONTH(v.venta_fecha) = ?
                AND v.venta_estado = 1
                GROUP BY p.pro_nom, p.pro_foto
                ORDER BY cantidad_vendida DESC
                LIMIT 8;`;

        const values = [ano, mes];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}


// Mostrar productos mas comprados por cliente
exports.mostrarProductosMasCompradosPorCliente = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT 
            p.pro_nom, 
            SUM(dv.cantidad_producto) AS cantidad_vendida
        FROM detalle_ventas dv
        JOIN ventas v ON dv.id_venta = v.id_venta
        JOIN productos p ON dv.id_producto = p.id_producto
        WHERE v.id_user = ?
        AND v.venta_estado = 1
        GROUP BY p.pro_nom
        ORDER BY cantidad_vendida DESC;
    `;
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar cantidad de productos vendidos por mes
exports.mostrarCuentaProductosVendidosPorMes = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT
                SUM(dv.cantidad_producto) AS cantidad
                FROM detalle_ventas dv
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE YEAR(v.venta_fecha) = ?
                AND MONTH(v.venta_fecha) = ?
                AND v.venta_estado = 1;`;

        const values = [ano, mes];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar cantidad y precio de ventas
exports.cuentaVentasMes = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT
                SUM(venta_total) AS total
                FROM ventas
                WHERE YEAR(venta_fecha) = ?
                AND MONTH(venta_fecha) = ?
                AND venta_estado = 1;`;

        const values = [ano, mes];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Mostrar ventas mensuales
exports.ventasMensuales = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                DATE_FORMAT(venta_fecha, '%d') AS dia, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE YEAR(venta_fecha) = ? AND MONTH(venta_fecha) = ?
                AND venta_estado = 1
                GROUP BY dia
                ORDER BY dia;`;
        const values = [ano, mes];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Generar PDF de ventas anuales
exports.generarPDFVentasAnual = async (ano) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                MONTH(venta_fecha) AS mes, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE YEAR(venta_fecha) = ?
                AND venta_estado = 1
                GROUP BY mes
                ORDER BY mes;`;

        const values = [ano];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}

// Generar PDF de ventas mensuales
exports.generarPDFVentasMensuales = async (ano, mes) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT 
                DATE_FORMAT(venta_fecha, '%d') AS dia, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE YEAR(venta_fecha) = ? AND MONTH(venta_fecha) = ?
                AND venta_estado = 1
                GROUP BY dia
                ORDER BY dia;`;

        const values = [ano, mes];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
}


// Crear venta
exports.crearVenta = async (venta, id_user) => {
    return new Promise((resolve, reject) => {
        const id_venta = `venta_${uuidv4()}`;
        const q = `INSERT INTO ventas (id_venta, venta_fecha, id_user, venta_metodo_pago, venta_total) VALUES (?)`;
        const values = [
            id_venta,
            venta.venta_fecha,
            id_user,
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
                message: "Detalle de venta creado exitosamente",
            });
        });
    })
}

// eliminar venta
exports.eliminarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE ventas SET venta_estado = 0 WHERE id_venta = ?`;
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                id: id,
                message: "Venta eliminada exitosamente",
            })
        });
    })
}

// Restaurar venta
exports.restaurarVenta = async (id) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE ventas SET venta_estado = 1 WHERE id_venta = ?`;
        const values = [id];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve({
                id: id,
                message: "Venta restaurada exitosamente",
            })
        });
    })
}