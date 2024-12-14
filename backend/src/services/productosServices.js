const productosRepository = require('../repositories/productosRepository');

exports.mostrarProductos = async () => {
    try {
        return await productosRepository.mostrarProductos();
    } catch (error) {
        throw new Error(error);
    }
}

exports.mostrarProductosPorCategoria = async (id) => {
    try {
        return await productosRepository.mostrarProductosPorCategoria(id);
    } catch (error) {
        throw new Error(error);
    }
}

exports.mostrarProductos = async (id) => {
    try {
        return await productosRepository.mostrarProducto(id);
    } catch (error) {
        throw new Error(error);
    }
}

exports.crearProducto = async (nombre, descripcion, precio, foto, puntos, id_categoria) => {
    try {
        return await productosRepository.crearProducto(nombre, descripcion, precio, foto, puntos, id_categoria);
    } catch (error) {
        throw new Error(error);
    }
}