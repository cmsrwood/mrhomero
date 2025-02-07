const ventasServices = require('../services/ventasServices');


exports.mostrarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
exports.mostrarVentas = async (req, res, next) => {
    try {
        const ventas = await ventasServices.mostrarVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
}

exports.mostrarDetalleVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarDetalleVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

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

exports.cantidadPrecioVentas = async (req, res, next) => {
    try {
        const response = await ventasServices.cantidadPrecioVentas(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.ventasMensuales = async (req, res, next) => {
    try {
        const response = await ventasServices.ventasMensuales(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.crearVenta = async (req, res, next) => {
    try {
        const venta = req.body;
        const response = await ventasServices.crearVenta(venta);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.crearDetalleVenta = async (req, res, next) => {
    try {
        const detalleVenta = req.body;
        const response = await ventasServices.crearDetalleVenta(detalleVenta);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


exports.generarPDFVentasMensuales = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        const response = await ventasServices.generarPDFVentasMensuales(ano, mes);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

exports.generarPDFVentasAnuales = async (req, res, next) => {
    try {
        const ano = req.params.ano;
        const response = await ventasServices.generarPDFVentasAnuales(ano);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

exports.borrarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.borrarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.restaurarVenta = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.restaurarVenta(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.mostrarCompras = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarCompras(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

exports.mostrarProductosMasCompradosPorCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await ventasServices.mostrarProductosMasCompradosPorCliente(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}