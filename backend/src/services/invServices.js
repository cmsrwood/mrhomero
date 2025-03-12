const inventarioRepository = require('../repositories/invRepository');
const provedoresRepository = require('../repositories/proveedoresRepository');
const { NotFoundError, BadRequestError} = require('../errors/ExceptionErrors');

// Servicio para mostrar el inventario
exports.mostrarInventario = async () => {
    return await inventarioRepository.mostrarInventario();
}

// Servicio para mostrar un producto del inventario
exports.mostrarProductoInventario = async (id) => {
    const response = await inventarioRepository.mostrarProductoInventario(id);
    if (response.length <= 0) throw new NotFoundError('El producto no existe');

    return response
}

// Servicio para crear un producto en el inventario
exports.crearInventario = async (inventario) => {
    const existe = await inventarioRepository.verificarNombre(inventario.inv_nombre);
    if (existe) throw new BadRequestError("El producto ya existe");

    const response = await inventarioRepository.crearInventario(inventario);
    return response
}

// Servicio para actualizar un producto en el inventario
exports.actualizarInventario = async (id, inventario) => {
    //se verifica si el producto existe
    const repetir = await this.mostrarProductoInventario(id);
    //se verifica si el nombre del producto ya existe
    const existe = await inventarioRepository.verificarNombre(inventario.nombre);

    if (repetir <= 0) throw new NotFoundError('El producto no existe');
    if (existe) throw new BadRequestError('El producto ya existe');

    const response = await inventarioRepository.actualizarInventario(id, inventario);
    return response
}

// Servicio para eliminar un producto en el inventario
exports.eliminarProductoInventario = async (id) => {
    //se verifica si el producto existe
    const existe = await this.mostrarProductoInventario(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');

    const response = await inventarioRepository.eliminarProductoInventario(id);
    return response
}

// Servicio para mostrar los proveedores
exports.mostrarProveedores = async () => {
    const response = await provedoresRepository.mostrarProveedores();
    return response;
}