const inventarioRepository = require('../repositories/invRepository');
const { ExistNameCategoriaError } = require('../errors/ExceptionErrors');

// Servicio para mostrar el inventario
exports.mostrarInventario = async () => {
    return await inventarioRepository.mostrarInventario();
}

// Servicio para crear un producto en el inventario
exports.crearInventario = async (inventario) => { 
    const existe = await inventarioRepository.verificarNombre(inventario.inv_nombre);
    if (existe) throw new ExistNameCategoriaError("El producto ya existe");
    return await inventarioRepository.crearInventario(inventario);
}