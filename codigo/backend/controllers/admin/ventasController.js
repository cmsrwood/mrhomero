const db = require('../../config/db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');

exports.mostrarVentas = (req, res) => {
    db.query(`
        SELECT 
            id_venta, 
            DATE_FORMAT(venta_fecha, '%Y-%m-%d / %H:%i:%s') AS venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total,
            venta_estado
        FROM ventas
    `, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.mostrarDetalleVenta = (req, res) => {
    db.query(`SELECT * from detalle_ventas where id_venta = '${req.params.id}'`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.mostrarProductosMasVendidos = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;

    db.query(`SELECT p.pro_nom,
                p.pro_foto,
                p.pro_nom   ,
                SUM(dv.cantidad_producto) AS cantidad_vendida
                FROM detalle_ventas dv
                JOIN productos p ON dv.id_producto = p.id_producto
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE MONTH(v.venta_fecha) = ?
                AND YEAR(v.venta_fecha) = ?
                GROUP BY p.pro_nom
                ORDER BY cantidad_vendida DESC;`, [mes, ano], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}

exports.mostrarCuentaProductosVendidosPorMes = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;


    db.query(`SELECT
                SUM(dv.cantidad_producto) AS cantidad
                FROM detalle_ventas dv
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE MONTH(v.venta_fecha) = ?
                AND YEAR(v.venta_fecha) = ?`, [mes, ano], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}

exports.cantidadPrecioVentas = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;

    db.query(`SELECT
                SUM(venta_total) AS total
                FROM ventas
                WHERE MONTH(venta_fecha) = ?
                AND YEAR(venta_fecha) = ?`, [mes, ano], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}

exports.ventasMensuales = (req, res) => {

    const mes = req.params.mes;
    const ano = req.params.ano;

    db.query(`SELECT 
                DATE_FORMAT(venta_fecha, '%d') AS dia, 
                SUM(venta_total) AS total_ventas
                FROM ventas
                WHERE MONTH(venta_fecha) = ? AND YEAR(venta_fecha) = ?
                GROUP BY dia
                ORDER BY dia; `, [mes, ano], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}

exports.crearVenta = (req, res) => {
    const id_venta = `venta_${uuidv4()}`;
    const fecha = req.body.fecha;
    const id_user = req.body.id_user ? req.body.id_user : null;
    const metodo_de_pago = req.body.metodo_pago;
    const venta_total = req.body.total;

    if (!id_venta || !fecha || !metodo_de_pago || !venta_total) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const values = [id_venta, fecha, id_user, metodo_de_pago, venta_total];

    db.query('INSERT INTO ventas (id_venta, venta_fecha, id_user, venta_metodo_pago, venta_total) VALUES (?, ?, ?, ?, ?)', values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        return res.status(200).send({ message: 'Venta creada exitosamente', id_venta: id_venta });
    });
}

exports.crearDetalleVenta = (req, res) => {
    const id_venta = req.body.id_venta;
    const id_producto = req.body.id_producto;
    const cantidad = req.body.cantidad;
    const precio_unitario = req.body.precio_unitario;
    const subtotal = req.body.subtotal;

    if (!id_venta || !id_producto || !cantidad) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    db.query('INSERT INTO detalle_ventas (id_venta, id_producto, cantidad_producto, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)', [id_venta, id_producto, cantidad, precio_unitario, subtotal], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        return res.status(200).send({ message: 'Venta creada exitosamente' });
    });
}

function generarPDF(ventas, mes, ano) {
    doc.pipe(fs.createWriteStream(`ventas_mensuales_${mes}_${ano}.pdf`));

    doc.font('Helvetica');
    doc.fontSize(25).text(`Reporte de Ventas Mensuales - ${mes}/${ano}`, { align: 'center' });
    doc.fontSize(12);

    // Crear la tabla
    doc.text("Día | Total de ventas");
    doc.text("---------------------");
    ventas.map(venta => {
        doc.text(`${venta.venta_fecha} | ${venta.venta_total}`);
    });
    doc.end();
}

exports.generarPDFVentasMensuales = async (req, res) => {
    const doc = new PDFDocument({ bufferPage: true });

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=ventas_mensuales.pdf`
    });

    doc.on('data', (data) => stream.write(stream));
    doc.on('end', stream.end());
};


exports.borrarVenta = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE ventas SET venta_estado = 0  WHERE id_venta = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send('Venta eliminada exitosamente');
        }
    });
}

exports.restaurarVenta = (req, res) => {
    const id = req.params.id;

    db.query('UPDATE ventas SET venta_estado = 1  WHERE id_venta = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');

        }
        else {
            return res.status(200).send('Venta restaurada exitosamente');
        }
    });
}
