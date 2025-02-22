const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const productosRepository = require('../repositories/productosRepository');

// Servicio para mostrar todos los productos
exports.mostrarProductos = async () => {
    const response = await productosRepository.mostrarProductos();

    if (response.length <= 0) throw new NotFoundError('No se encontraron productos');
    return response
}

// Servicio para mostrar productos por categoria
exports.mostrarProductosPorCategoria = async (id) => {
    const existe = await productosRepository.mostrarProductosPorCategoria(id);
    return existe
}

// Servicio para mostrar un producto
exports.mostrarProducto = async (id) => {
    const existe = await productosRepository.mostrarProducto(id);
    if (existe.length < 0) throw new NotFoundError('El producto no existe');
    return existe
}

// Servicio para crear un producto
exports.crearProducto = async (producto) => {
    const existe = await productosRepository.verificarNombre(producto.nombre);
    if (existe) throw new BadRequestError("El producto ya existe");
    return await productosRepository.crearProducto(producto);
}

// Servicio para actualizar un producto
exports.actualizarProducto = async (id, producto) => {
    const response = await productosRepository.actualizarProducto(id, producto);
    return response
}

//Servicio para restaurar un producto
exports.restaurarProducto = async (id) => {
    const existe = await this.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');

    const response = await productosRepository.restaurarProducto(id);
    return response
}

// Servicio para eliminar un producto
exports.eliminarProducto = async (id) => {
    const existe = await this.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');

    const response = await productosRepository.eliminarProducto(id);
    return response
}