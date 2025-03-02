const ventasServices = require('../services/ventasServices');

// Controlador para mostrar todas las ventas
exports.mostrarVentas = async (req, res, next) => {
    try {
        const ventas = await ventasServices.mostrarVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
}

// Controlador para mostrar una venta
exports.mostrarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para mostrar compras de un cliente
exports.mostrarCompras = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarCompras(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Controlador para mostrar detalles de una venta
exports.mostrarDetalleVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarDetalleVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Controlador para mostrar productos mas vendidos
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

// Controlador para mostrar productos mas vendidos por cliente
exports.mostrarProductosMasCompradosPorCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarProductosMasCompradosPorCliente(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para mostrar productos mas vendidos por mes
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

// Controlador para mostrar ventas anuales
exports.cuentaVentasMes = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.cuentaVentasMes(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para mostrar ventas mensuales
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



// Controlador para generar PDF de ventas anuales
exports.generarPDFVentasAnuales = async (req, res, next) => {
    try {
        const { ano } = req.params;
        const doc = await ventasServices.generarPDFVentasAnuales(ano);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_ventas_${ano}.pdf`);

        doc.pipe(res);

    } catch (error) {
        next(error);
    }
};

// Controlador para generar PDF de ventas mensuales
exports.generarPDFVentasMensuales = async (req, res, next) => {
    try {
        const { ano, mes } = req.params;
        const doc = await ventasServices.generarPDFVentasMensuales(ano, mes);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_ventas_${ano}_${mes}.pdf`);

        doc.pipe(res);

    } catch (error) {
        next(error);
    }
};

exports.reporteAnualIA = async (req, res, next) => {
    try {
        const { ano } = req.params;
        const response = await ventasServices.reporteAnualIA(ano);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
exports.reporteMensualIA = async (req, res, next) => {
    try {
        const { ano, mes } = req.params;
        const response = await ventasServices.reporteMensualIA(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para crear una venta
exports.crearVenta = async (req, res, next) => {
    try {
        const venta = req.body;
        const id_user = req.body.id_user ? req.body.id_user : null;
        const response = await ventasServices.crearVenta(venta, id_user);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para crear un detalle de venta
exports.crearDetalleVenta = async (req, res, next) => {
    try {
        const detalleVenta = req.body;
        const response = await ventasServices.crearDetalleVenta(detalleVenta);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para eliminar una venta
exports.eliminarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.eliminarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// Controlador para restaurar una venta
exports.restaurarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.restaurarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}