const pdfkitTable = require('pdfkit-table');
const path = require('path');
const moment = require('moment');
const ventasRepository = require('../repositories/ventasRepository');
const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');

// Función para obtener el nombre del mes
function mesANombre(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes - 1];
}

// Función para formatear el número
const formatNumber = (value) => {
    const formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Función para generar el PDF
async function generarPDF(doc, ventas, ano, mes) {
    const filePath = path.resolve(__dirname, `../../../frontend/public/logo.png`);

    // PDF de ventas diarias
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

    // PDF de ventas mensuales
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
    } else {
        throw new BadRequestError('No se proporcionó un mes o un año válido.');
    }
}

exports.mostrarVentas = async (ano, mes) => {
    return await ventasRepository.mostrarVentas(ano, mes);
};

exports.mostrarDetalleVenta = async (ano, mes) => {
    return await ventasRepository.mostrarDetalleVenta(ano, mes);
};

exports.mostrarProductosMasVendidos = async (ano, mes) => {
    return await ventasRepository.mostrarProductosMasVendidos(ano, mes);
};

exports.mostrarCuentaProductosVendidosPorMes = async (ano) => {
    return await ventasRepository.mostrarCuentaProductosVendidosPorMes(ano);
}

exports.cantidadPrecioVentas = async (ano, mes) => {
    return await ventasRepository.cantidadPrecioVentas(ano, mes);
}

exports.ventasMensuales = async (ano) => {
    return await ventasRepository.ventasMensuales(ano);
}

exports.crearVenta = async (venta) => {
    return await ventasRepository.crearVenta(venta);
};

exports.generarPDFVentasMensuales = async (ano, mes) => {
    const ventas = await ventasRepository.generarPDFVentasMensuales(mes, ano);

    const doc = new pdfkitTable({ bufferPage: true });

    await generarPDF(doc, ventas, ano, mes);

    return doc;
};

exports.generarPDFVentasAnuales = async (ano) => {
    const ventas = await ventasRepository.generarPDFVentasDiarias(ano);

    const doc = new pdfkitTable({ bufferPage: true });

    await generarPDF(doc, ventas, ano);

    return doc;
};