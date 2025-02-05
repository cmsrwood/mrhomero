const inventarioRepository = require('../repositories/invRepository');
const { NotFoundError, ExistNameCategoriaError } = require('../errors/ExceptionErrors');

// Servicio para mostrar el inventario
exports.mostrarInventario = async () => {
    return await inventarioRepository.mostrarInventario();
}

// Servicio para mostrar un producto del inventario
exports.mostrarProductoInventario = async (id) => {
    return await inventarioRepository.mostrarProductoInventario(id);
}

// Servicio para crear un producto en el inventario
exports.crearInventario = async (inventario) => {
    const existe = await inventarioRepository.verificarNombre(inventario.inv_nombre);
    if (existe) throw new ExistNameCategoriaError("El producto ya existe");
    return await inventarioRepository.crearInventario(inventario);
}

// Servicio para actualizar un producto en el inventario
exports.actualizarInventario = async (id, inventario) => {
    //se verifica si el producto existe
    const repetir = await this.mostrarProductoInventario(id);
    //se verifica si el nombre del producto ya existe
    const existe = await inventarioRepository.verificarNombre(inventario.nombre);

    if (repetir <= 0) throw new NotFoundError('El producto no existe');
    if (existe) throw new ExistNameCategoriaError('Hay un producto con el mismo nombre');

    const response = await inventarioRepository.actualizarInventario(id, inventario);
    return response
}

// Servicio para borrar un producto en el inventario
exports.borrarProductoInventario = async (id) => {
    //se verifica si el producto existe
    const existe = await this.mostrarProductoInventario(id);
    if (existe.length <= 0) throw new NotFoundError('El producto no existe');

    const response = await inventarioRepository.borrarProductoInventario(id);
    return response
}

// Servicio para mostrar las categorias
exports.mostrarCategorias = async () => { 
    return await inventarioRepository.mostrarCategorias();
}

// Servicio para mostrar los proveedores
exports.mostrarProveedores = async () => { 
    return await inventarioRepository.mostrarProveedores();
}