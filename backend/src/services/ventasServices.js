const pdfkitTable = require('pdfkit-table');
const OpenAI = require('openai');
const path = require('path');
require('dotenv').config();
const moment = require('moment');
const ventasRepository = require('../repositories/ventasRepository');
const clientesRepository = require('../repositories/clientesRepository');
const productosRepository = require('../repositories/productosRepository');
const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');

const apiKey = process.env.OPENAI_API_KEY_MRHOMERO;
const openai = new OpenAI({
    baseURL: 'https://api.openai.com/v1',
    apiKey: apiKey
});

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
    return response;
};

// Servicios para mostrar productos mas vendidos por cliente
exports.mostrarProductosMasCompradosPorCliente = async (id) => {
    const existe = await clientesRepository.mostrarCliente(id);
    if (existe.length <= 0) throw new NotFoundError('El cliente no existe');
    const response = await ventasRepository.mostrarProductosMasCompradosPorCliente(id);
    return response;
};

// Servicios para mostrar productos mas vendidos por mes
exports.mostrarCuentaProductosVendidosPorMes = async (ano, mes) => {
    const response = await ventasRepository.mostrarCuentaProductosVendidosPorMes(ano, mes);
    return response;
};

// Servicios para mostrar ventas anuales
exports.cuentaVentasMes = async (ano, mes) => {
    const response = await ventasRepository.cuentaVentasMes(ano, mes);
    return response;
}

// Servicios para mostrar ventas mensuales
exports.ventasMensuales = async (ano, mes) => {
    const response = await ventasRepository.ventasMensuales(ano, mes);
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

async function reporteAnualGPT(ventas, ano) {
    const prompt = `Datos de ventas: ${JSON.stringify(ventas, null, 2) || 'No hay ventas'} para año ${ano}.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
                Eres una IA analítica de ventas. Usa **solo** la información proporcionada. No generes datos falsos ni hagas suposiciones.
                Genera un reporte de ventas en formato profesional y atractivo con estilo de IA analítica.
                El negocio es un restaurante llamado 'Mr. Homero'. Usa **solo** los datos proporcionados, no inventes información adicional.
                No pases links
                No uses "**"
                No tengas errores de ortografía
                Puedes ser creativo con el final, no tiene que ser siempre igual y puedes usar emoticonos, recuerda que tiene que ser atractivo
                El reporte debe ser corto y atractivo. No tiene que ser muy largo. Ejemplo de formato:

                Reporte de Ventas 📊 - Mr. Homero 🍔🔥
                (Reporte generado con Mr. Homero Analytics 🤖)

                🔹 Enero
                💰 Ventas totales: $1,000
                📈 Análisis: Las ventas se mantuvieron estables este mes. Comparado con diciembre, no hubo cambios significativos, lo que sugiere una base sólida para construir crecimiento.

                🔹 Febrero
                💰 Ventas totales: $1,000
                📈 Análisis: Similar a enero, las ventas se mantuvieron constantes. Es importante identificar oportunidades para impulsar el crecimiento, como promociones o eventos temáticos.

                Aqui puedes ser creativo con el final
                `
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion.choices[0].message.content;
}

// Servicios para generar IA reporte de ventas mensuales
async function reporteMensualGPT(ventas, productoMasVendido, ano, mes) {
    const prompt = `Datos de ventas: ${JSON.stringify(ventas, null, 2) || 'No hay ventas'} para año ${ano} y mes ${mes}. Producto mas vendido: ${JSON.stringify(productoMasVendido, null, 2)}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
                Eres una IA analítica de ventas. Usa **solo** la información proporcionada. No generes datos falsos ni hagas suposiciones.
                Genera un reporte de ventas en formato profesional y atractivo con estilo de IA analítica.
                El negocio es un restaurante llamado 'Mr. Homero'. Usa **solo** los datos proporcionados, no inventes información adicional.
                No pases links
                No uses "**"
                No tengas errores de ortografía
                Puedes ser creativo con el final, no tiene que ser siempre igual y puedes usar emoticonos, recuerda que tiene que ser atractivo
                El reporte debe ser corto y atractivo. No tiene que ser muy largo. Ejemplo de formato:

                Reporte de Ventas 📊 - Mr. Homero 🍔🔥 
                (Reporte generado con Mr. Homero Analytics 🤖)

                🔹 Día 01 de Enero
                💰 Ventas totales: $1,000
                📈 Inicio estable del mes, con una demanda dentro del rango esperado.

                🔹 Día 02 de Enero
                💰 Ventas totales: $1,000
                📊 Incremento del +99% respecto al día anterior, reflejando un crecimiento positivo en las ventas.

                Aqui puedes ser creativo con el final
                `
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion.choices[0].message.content;
}


exports.reporteAnualIA = async (ano) => {
    const ventas = await ventasRepository.generarPDFVentasAnual(ano);

    const response = await reporteAnualGPT(ventas, ano);

    return response
}

exports.reporteMensualIA = async (ano, mes) => {
    const ventas = await ventasRepository.ventasMensuales(ano, mes);

    const productoMasVendidos = await ventasRepository.mostrarProductosMasVendidos(ano, mes);

    const productoMasVendido = productoMasVendidos[0] || {};

    delete productoMasVendido["pro_foto"];

    const response = await reporteMensualGPT(ventas, productoMasVendido, ano, mes);
    return response
}

// Servicios para crear una venta
exports.crearVenta = async (venta, id_user) => {

    if (id_user == null) {
        const response = await ventasRepository.crearVenta(venta, id_user);
        return response
    }
    else {
        const existe = await clientesRepository.mostrarCliente(venta.id_user);
        if (existe == null) throw new NotFoundError('El cliente no existe');
        const response = await ventasRepository.crearVenta(venta, id_user);
        return response
    }
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