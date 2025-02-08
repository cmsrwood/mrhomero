const ventasServices = require('../services/ventasServices');

// Mostrar todas las ventas
exports.mostrarVentas = async (req, res, next) => {
    try {
        const ventas = await ventasServices.mostrarVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
}

// Mostrar una venta
exports.mostrarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Mostrar compras de un cliente
exports.mostrarCompras = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarCompras(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Mostrar detalles de una venta
exports.mostrarDetalleVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarDetalleVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Mostrar productos mas vendidos
exports.mostrarProductosMasVendidos = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.mostrarProductosMasVendidos(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Mostrar productos mas vendidos por cliente
exports.mostrarProductosMasCompradosPorCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarProductosMasCompradosPorCliente(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Mostrar productos mas vendidos por mes
exports.mostrarCuentaProductosVendidosPorMes = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.mostrarCuentaProductosVendidosPorMes(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Mostrar ventas anuales
exports.ventasAnuales = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.VentasAnuales(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Mostrar ventas mensuales
exports.ventasMensuales = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.ventasMensuales(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Generar PDF de ventas anuales
exports.generarPDFVentasAnuales = async (req, res, next) => {
    try {
        const { ano } = req.params;
        const doc = await ventasServices.generarPDFVentasAnuales(ano);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_ventas.pdf');

        doc.pipe(res);

    } catch (error) {
        next(error);
    }
};

// Generar PDF de ventas mensuales
exports.generarPDFVentasMensuales = async (req, res, next) => {
    try {
        const { ano, mes } = req.params;
        const doc = await ventasServices.generarPDFVentasMensuales(ano, mes);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_ventas.pdf');

        doc.pipe(res);

    } catch (error) {
        next(error);
    }
};

// Crear una venta
exports.crearVenta = async (req, res, next) => {
    try {
        const venta = req.body;
        const response = await ventasServices.crearVenta(venta);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Crear un detalle de venta
exports.crearDetalleVenta = async (req, res, next) => {
    try {
        const detalleVenta = req.body;
        const response = await ventasServices.crearDetalleVenta(detalleVenta);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Borrar una venta
exports.borrarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.borrarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Restaurar una venta
exports.restaurarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.restaurarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}