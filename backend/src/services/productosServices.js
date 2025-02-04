const { NotFoundError, ExistNameCategoriaError } = require('../errors/ExceptionErrors');
const productosRepository = require('../repositories/productosRepository');

// Servicio para mostrar todos los productos
exports.mostrarProductos = async () => {
    return await productosRepository.mostrarProductos();
}

// Servicio para mostrar productos por categoria
exports.mostrarProductosPorCategoria = async (id) => {
    const existe = await productosRepository.mostrarProductosPorCategoria(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    return existe
}

// Servicio para mostrar un producto
exports.mostrarProducto = async (id) => {
    const existe = await productosRepository.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    return existe
}

// Servicio para crear un producto
exports.crearProducto = async (producto) => {
    const existe = await productosRepository.verificarNombre(producto.nombre);
    if (existe) throw new ExistNameCategoriaError("El producto ya existe");
    return await productosRepository.crearProducto(producto);
}

// Servicio para actualizar un producto
exports.actualizarProducto = async (id, producto) => {

    //se verifica si el producto existe
    const repetir = await this.mostrarProducto(id);
    //se verifica si el nombre del producto ya existe
    const existe = await productosRepository.verificarNombre(producto.nombre);

    if (repetir <= 0) throw new NotFoundError('El producto no existe');
    if (existe) throw new ExistNameCategoriaError('Hay un producto con el mismo nombre');

    const response = await productosRepository.actualizarProducto(id, producto);
    return response
}

// Servicio para eliminar un producto
exports.eliminarProducto = async (id) => {
    const existe = await this.mostrarProducto(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');
    const response = await productosRepository.eliminarProducto(id);
    return response
}