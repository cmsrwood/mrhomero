const { NotFoundError, ExistNameCategoriaError } = require('../errors/ExceptionErrors');
const productosRepository = require('../repositories/productosRepository');

exports.mostrarProductos = async () => {
    return await productosRepository.mostrarProductos();
}

exports.mostrarProductosPorCategoria = async (id) => {
    const existe = await productosRepository.mostrarProductosPorCategoria(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    return existe
}

exports.mostrarProducto = async (id) => {
    const existe = await productosRepository.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    return existe
}

exports.crearProducto = async (nombre, descripcion, precio, foto, puntos, id_categoria) => {
    const existe = await productosRepository.verificarNombre(nombre);
    if (existe) throw new ExistNameCategoriaError("El producto ya existe");
    return await productosRepository.crearProducto(nombre, descripcion, precio, foto, puntos, id_categoria);
}

exports.actualizarProducto = async (id, nombre, descripcion, precio, foto, puntos) => {
    //se verifica si el producto existe
    const repetir = await this.mostrarProducto(id);
    //se verifica si el nombre del producto ya existe
    const existe = await productosRepository.verificarNombre(nombre);

    if (repetir <= 0) throw new NotFoundError('El producto no existe');
    if (existe) throw new ExistNameCategoriaError('El producto ya existe');

    const response = await productosRepository.actualizarProducto(id, nombre, descripcion, precio, foto, puntos);
    return response
}

exports.eliminarProducto = async (id) => {
    const existe = await this.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    const response = await productosRepository.eliminarProducto(id);
    return response
}