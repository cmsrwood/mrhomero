const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const pdfkitTable = require('pdfkit-table')
const moment = require('moment');
const path = require('path');

exports.mostrarVentas = (req, res) => {
    db.query(`
        
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

/* Generar PDF */

function mesANombre(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes - 1];
}

const formatNumber = (value) => {
    const formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

async function generarPDF(doc, ventas, ano, mes) {
    const filePath = path.resolve(__dirname, `../../../frontend/public/logo.png`);

    /* Reporte de ventas mensuales */

    if (mes && ano) {
        doc.font('Helvetica');
        doc.image(filePath, 480, 60, { width: 80 })
        doc.fontSize(20).text(`Reporte de Ventas Mensuales\n${mesANombre(mes)}/${ano}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Ventas del mes de ${mesANombre(mes)}/${ano}`, { align: 'start' });
        doc.moveDown();

        const diasMes = [];

        for (let dia = 1; dia <= moment(`${ano}-${mes}-01`, "YYYY-MM").daysInMonth(); dia++) {
            diasMes.push(dia);
        }

        const ventasDiarias = diasMes.map(dia => {
            const venta = ventas.find(venta => venta.dia == dia);
            return {
                dia: `${dia}/${mes}/${ano}`,
                total_ventas: venta ? formatNumber(venta.total_ventas) : 'Sin ventas'
            };
        });

        const table = {
            headers: ["Fecha", "Total de ventas"],
            rows: ventasDiarias.map(venta => [venta.dia, venta.total_ventas])
        };

        await doc.table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
            prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8)
        });

        doc.fontSize(12).text(`Total de ventas en mes ${mesANombre(mes)}/${ano}: ${formatNumber(ventas.reduce((total, venta) => total + venta.total_ventas, 0))}`, { align: 'end' });

        doc.end();
    }

    /* Reporte de ventas anuales */

    else if (ano && !mes) {
        doc.font('Helvetica');
        doc.image(filePath, 480, 60, { width: 80 })
        doc.fontSize(20).text(`Reporte de ventas ${ano}`, { align: 'center' });
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();

        const meses = [];

        for (let mes = 1; mes <= 12; mes++) {
            meses.push(mes);
        }

        const ventasMensuales = meses.map(mes => {
            const venta = ventas.find(venta => venta.mes == mes);
            return {
                mes: mesANombre(mes),
                total_ventas: venta ? formatNumber(venta.total_ventas) : 'Sin ventas'
            };
        });

        const table = {
            headers: ["Mes", "Total de ventas"],
            rows: ventasMensuales.map(venta => [venta.mes, venta.total_ventas])
        };

        await doc.table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
            prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8)
        });

        doc.fontSize(12).text(`Total de ventas en ${ano}: ${formatNumber(ventas.reduce((total, venta) => total + venta.total_ventas, 0))}`, { align: 'end' });

        doc.end();
    }
    else {
        console.log('Faltan parametros');
    }
}

exports.generarPDFVentasMensuales = async (req, res) => {

    const ano = req.params.ano;
    const mes = req.params.mes;

    const doc = new pdfkitTable({ bufferPage: true });

    const filename = `ventas_mensuales_${mes}_${ano}.pdf`;

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${filename}`
    });

    doc.on('data', (data) => stream.write(data));
    doc.on('end', () => stream.end());

    db.query(`SELECT
            DATE_FORMAT(venta_fecha, '%d') AS dia,
            SUM(venta_total) AS total_ventas
            FROM ventas
            WHERE MONTH(venta_fecha) = ? AND YEAR(venta_fecha) = ?
            GROUP BY dia
            ORDER BY dia;`, [mes, ano], (err, ventas) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            generarPDF(doc, ventas, ano, mes);
        }
    });
};

exports.generarPDFVentasAnuales = async (req, res) => {

    const ano = req.params.ano;

    const doc = new pdfkitTable({ bufferPage: true });

    const filename = `ventas_${ano}.pdf`;

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${filename}`
    });

    doc.on('data', (data) => stream.write(data));
    doc.on('end', () => stream.end());

    db.query(`SELECT 
            DATE_FORMAT(venta_fecha, '%m') AS mes,
            SUM(venta_total) AS total_ventas
            FROM ventas
            WHERE YEAR(venta_fecha) = ?
            GROUP BY mes
            ORDER BY mes;`, [ano], (err, ventas) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            generarPDF(doc, ventas, ano);
        }
    });

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

exports.mostrarCompras = (req, res) => {
    const id = req.params.id;
    db.query(`
        SELECT 
            id_venta, 
            venta_fecha, 
            id_user, 
            venta_metodo_pago, 
            venta_total,
            venta_estado
        FROM ventas
        WHERE id_user = ?
    `, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

exports.mostrarProductosMasCompradosPorCliente = (req, res) => {

    const id = req.params.id;

    db.query(`SELECT p.pro_nom,
                p.pro_foto,
                SUM(dv.cantidad_producto) AS cantidad_vendida
                FROM detalle_ventas dv
                JOIN productos p ON dv.id_producto = p.id_producto
                JOIN ventas v ON dv.id_venta = v.id_venta
                WHERE v.id_user = ?
                GROUP BY p.pro_nom
                ORDER BY cantidad_vendida DESC;`, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        } else {
            return res.status(200).send(results);
        }
    });
}