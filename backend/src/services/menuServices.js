const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const menuRepository = require('../repositories/menuRepository');

//Servicio para mostrar las categorias
exports.mostrarCategorias = async () => {
    return await menuRepository.mostrarCategorias();
};

//Servicio para mostrar una categoria
exports.mostrarCategoria = async (id) => {
    const categoria = await menuRepository.mostrarCategoria(id);
    if (categoria.length <= 0) throw new NotFoundError('La categoria no existe');
    return categoria
};

//Servicio para crear una categoria
exports.crearCategoria = async (categoria) => {
    //Verificar si la categoria ya existe
    const existe = await menuRepository.verificarNombre(categoria.categoria);
    if (existe) throw new BadRequestError('La categoria ya existe');

    const response = await menuRepository.crearCategoria(categoria);
    return response;
};

//Servicio para actualizar una categoria
exports.actualizarCategoria = async (id, categoria) => {
    const existe = await this.mostrarCategoria(id)
    const existe2 = await menuRepository.verificarNombre(categoria.nombre);

    if (existe.length <= 0) throw new NotFoundError('La categoria no existe');
    if (existe2) throw new BadRequestError('La categoria ya existe');
    const reponse = await menuRepository.actualizarCategoria(id, categoria);
    return reponse
}

exports.restaurarCategoria = async (id) => {
    const existe = await this.mostrarCategoria(id)
    if (existe.length <= 0) throw new NotFoundError('La categoria no existe');
    const response = await menuRepository.restaurarCategoria(id);
    return response
}

//Servicio para eliminar una categoria
exports.eliminarCategoria = async (id) => {
    const existe = await this.mostrarCategoria(id)
    const verificarProductosPorCategoria = await menuRepository.verificarProductosPorCategoria(id);
    if (verificarProductosPorCategoria) throw new BadRequestError('Elimina los productos antes de eliminar la categoria');
    if (!existe) throw new NotFoundError('La categoria no existe');
    const response = await menuRepository.eliminarCategoria(id);
    return response
}