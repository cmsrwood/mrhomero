const proveedoresRepository = require('../repositories/proveedoresRepository');
const { NotFoundError } = require('../errors/ExceptionErrors');

// Servicio para mostrar los proveedores
exports.mostrarProveedores = async () => {
    return await proveedoresRepository.mostrarProveedores();
}

// Servicio para crear un proveedor
exports.crearProveedor = async (proveedor) => {
    const response = await proveedoresRepository.crearProveedor(proveedor);
    return response;
}

// Servicio para actualizar un proveedor
exports.actualizarProveedor = async (id, proveedor) => {
    const existe = await proveedoresRepository.mostrarProveedor(id);
    if (existe.length <= 0) throw new NotFoundError('El proveedor no existe');
    const response = await proveedoresRepository.actualizarProveedor(id, proveedor);
    return response;
}

// Servicio para eliminar un proveedor
exports.eliminarProveedor = async (id) => {
    const existe = await proveedoresRepository.mostrarProveedor(id);
    if (existe.length <= 0) throw new NotFoundError('El proveedor no existe');
    const response = await proveedoresRepository.eliminarProveedor(id);
    return response;
}

