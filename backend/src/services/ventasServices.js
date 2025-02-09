const pdfkitTable = require('pdfkit-table');
const path = require('path');
const moment = require('moment');
const ventasRepository = require('../repositories/ventasRepository');
const clientesRepository = require('../repositories/clientesRepository');
const productosRepository = require('../repositories/productosRepository');

const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');

// Convierte el número del mes a su nombre en español
function mesANombre(mes) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes - 1];
}

// Formatea un número separando los miles con puntos
const formatNumber = (value) => {
    const formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Genera el contenido del PDF
async function generarPDF(doc, ventas, ano, mes) {
    const filePath = path.resolve(__dirname, `../../../frontend/public/logo.png`);

    // Reporte de ventas diarias para un mes específico
    if (mes && ano) {
        doc.font('Helvetica');
        doc.image(filePath, 480, 60, { width: 80 });
        doc.fontSize(20)
            .text(`Reporte de Ventas Mensuales\n${mesANombre(mes)}/${ano}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12)
            .text(`Ventas del mes de ${mesANombre(mes)}/${ano}`, { align: 'start' });
        doc.moveDown();

        // Array con todos los días del mes
        const diasMes = [];
        for (let dia = 1; dia <= moment(`${ano}-${mes}-01`, "YYYY-MM").daysInMonth(); dia++) {
            diasMes.push(dia);
        }

        // Mapea la data para cada día
        const ventasDiarias = diasMes.map(dia => {
            const venta = ventas.find(v => v.dia == dia);
            return {
                dia: `${dia}/${mes}/${ano}`,
                total_ventas: venta ? formatNumber(venta.total_ventas) : 'Sin ventas'
            };
        });

        // Configuración de la tabla en el PDF
        const table = {
            headers: ["Fecha", "Total de ventas"],
            rows: ventasDiarias.map(venta => [venta.dia, venta.total_ventas])
        };

        await doc.table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
            prepareRow: () => doc.font("Helvetica").fontSize(8)
        });

        const totalVentas = ventas.reduce((total, venta) => total + venta.total_ventas, 0);
        doc.fontSize(12)
            .text(`Total de ventas en mes ${mesANombre(mes)}/${ano}: ${formatNumber(totalVentas)}`, { align: 'end' });

        doc.end();
    }
    // Reporte de ventas mensuales para un año completo
    else if (ano && !mes) {
        doc.font('Helvetica');
        doc.image(filePath, 480, 60, { width: 80 });
        doc.fontSize(20)
            .text(`Reporte de ventas ${ano}`, { align: 'center' });
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();

        // Array con los 12 meses
        const meses = [];
        for (let m = 1; m <= 12; m++) {
            meses.push(m);
        }

        // Mapea la data para cada mes
        const ventasMensuales = meses.map(mesNum => {
            const venta = ventas.find(v => v.mes == mesNum);
            return {
                mes: mesANombre(mesNum),
                total_ventas: venta ? formatNumber(venta.total_ventas) : 'Sin ventas'
            };
        });

        const table = {
            headers: ["Mes", "Total de ventas"],
            rows: ventasMensuales.map(venta => [venta.mes, venta.total_ventas])
        };

        await doc.table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
            prepareRow: () => doc.font("Helvetica").fontSize(8)
        });

        const totalVentas = ventas.reduce((total, venta) => total + venta.total_ventas, 0);
        doc.fontSize(12)
            .text(`Total de ventas en ${ano}: ${formatNumber(totalVentas)}`, { align: 'end' });

        doc.end();
    } else {
        throw new BadRequestError('No se proporcionó un mes o un año válido.');
    }
}

// Servicios para mostrar ventas
exports.mostrarVentas = async (ano, mes) => {
    const response = await ventasRepository.mostrarVentas(ano, mes);
    if (response.length <= 0)
        throw new NotFoundError(`No se encontraron ventas en el mes de ${mesANombre(mes)} / ${ano}`);
    return response;
};

// Servicios para mostrar una venta
exports.mostrarVenta = async (id) => {
    const response = await ventasRepository.mostrarVenta(id);
    if (response.length <= 0) throw new NotFoundError(`No se encontraron ventas con el id: ${id}`);
    return response;
};

// Servicios para mostrar compras de un cliente
exports.mostrarCompras = async (id) => {
    const cliente = await clientesRepository.mostrarCliente(id);
    if (cliente.length <= 0) throw new NotFoundError('El cliente no existe');

    const response = await ventasRepository.mostrarCompras(id);
    if (response.length <= 0)
        throw new NotFoundError(`No se encontraron compras del cliente con el id: ${id}`);
    return response;
};

// Servicios para mostrar detalles de una venta
exports.mostrarDetalleVenta = async (id) => {
    const response = await ventasRepository.mostrarDetalleVenta(id);
    if (response.length <= 0)
        throw new NotFoundError(`No se encontraron detalles de la venta con el id: ${id}`);
    return response;
};

// Servicios para mostrar productos mas vendidos
exports.mostrarProductosMasVendidos = async (ano, mes) => {
    const response = await ventasRepository.mostrarProductosMasVendidos(ano, mes);
    if (response.length <= 0)
        throw new NotFoundError(`No se encontraron productos vendidos en el mes de ${mesANombre(mes)} / ${ano}`);
    return response;
};

// Servicios para mostrar productos mas vendidos por cliente
exports.mostrarProductosMasCompradosPorCliente = async (id) => {
    const existe = await clientesRepository.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await ventasRepository.mostrarProductosMasCompradosPorCliente(id);
    if (response.length <= 0)
        throw new NotFoundError('No se encontraron productos vendidos por el cliente');
    return response;
};

// Servicios para mostrar productos mas vendidos por mes
exports.mostrarCuentaProductosVendidosPorMes = async (ano, mes) => {
    const response = await ventasRepository.mostrarCuentaProductosVendidosPorMes(ano, mes);
    if (response.cantidad <= 0)
        throw new NotFoundError(`No se encontraron productos vendidos en el mes de ${mesANombre(mes)} / ${ano}`);
    return response;
};

// Servicios para mostrar ventas anuales
exports.VentasAnuales = async (ano, mes) => {
    const response = await ventasRepository.VentasAnuales(ano, mes);
    if (response.cantidad <= 0)
        throw new NotFoundError(`No se encontraron productos vendidos en el mes de ${mesANombre(mes)} / ${ano}`);
    return response;
}

// Servicios para mostrar ventas mensuales
exports.ventasMensuales = async (ano, mes) => {
    const response = await ventasRepository.ventasMensuales(ano, mes);
    if (response.length <= 0)
        throw new NotFoundError(`No se encontraron ventas en el mes de ${mesANombre(mes)} / ${ano}`);
    return response;
};

// Servicios para generar PDF de ventas anuales
exports.generarPDFVentasAnuales = async (ano) => {
    const ventas = await ventasRepository.generarPDFVentasAnual(ano);
    const doc = new pdfkitTable({ bufferPages: true });
    await generarPDF(doc, ventas, ano);
    return doc;
};

// Servicios para generar PDF de ventas mensuales
exports.generarPDFVentasMensuales = async (ano, mes) => {
    const ventas = await ventasRepository.generarPDFVentasMensuales(ano, mes);
    const doc = new pdfkitTable({ bufferPages: true });
    await generarPDF(doc, ventas, ano, mes);
    return doc;
};

// Servicios para crear una venta
exports.crearVenta = async (venta) => {
    const existe = await clientesRepository.mostrarCliente(venta.id_user);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    return await ventasRepository.crearVenta(venta);
};

// Servicios para crear un detalle de venta
exports.crearDetalleVenta = async (detalle_venta) => {

    const existeProducto = await productosRepository.mostrarProducto(detalle_venta.id_producto);
    if (existeProducto.length <= 0) throw new NotFoundError('El producto no existe');

    const existe = await ventasRepository.mostrarVenta(detalle_venta.id_venta);
    if (existe.length <= 0) throw new NotFoundError('La venta no existe');

    return await ventasRepository.crearDetalleVenta(detalle_venta);
};

// Servicios para eliminar una venta
exports.eliminarVenta = async (id) => {
    const existe = await ventasRepository.mostrarVenta(id);
    if (existe.length <= 0) throw new NotFoundError('La venta no existe');

    const response = await ventasRepository.eliminarVenta(id);
    return response
};

// Servicios para restaurar una venta
exports.restaurarVenta = async (id) => {
    const existe = await ventasRepository.mostrarVenta(id);
    if (existe.length <= 0) throw new NotFoundError('La venta no existe');

    const response = await ventasRepository.restaurarVenta(id);
    return response
};