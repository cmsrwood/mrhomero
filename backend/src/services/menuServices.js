const { ExistNameCategoriaError, NotFoundError } = require('../errors/ExceptionErrors');
const menuRepository = require('../repositories/menuRepository');


//Servicio para mostrar las categorias
exports.mostrarCategorias = async () => {
    return await menuRepository.mostrarCategorias();
};

//Servicio para mostrar una categoria
exports.mostrarCategoria = async (id) => {
    const existe = await menuRepository.mostrarCategoria(id);
    if (existe.length <= 0) throw new NotFoundError('La categoria no existe');
    return existe
};

//Servicio para crear una categoria
exports.crearCategoria = async (categoria, foto) => {
    //Verificar si la categoria ya existe
    const existe = await menuRepository.verificarNombre(categoria);
    if (existe) throw new ExistNameCategoriaError();

    const response = await menuRepository.crearCategoria(categoria, foto);
    return response;
};

//Servicio para actualizar una categoria
exports.actualizarCategoria = async (id, foto, categoria) => {
    const existe = await this.mostrarCategoria(id)
    const existe2 = await menuRepository.verificarNombre(categoria);

    if (existe.length <= 0) throw new NotFoundError('La categoria no existe');
    if (existe2) throw new ExistNameCategoriaError();
    const reponse = await menuRepository.actualizarCategoria(id, foto, categoria);
    return reponse
}

//Servicio para eliminar una categoria
exports.eliminarCategoria = async (id) => {
    const existe = await this.mostrarCategoria(id)
    if (existe.length <= 0) throw new NotFoundError('La categoria no existe');
    const response = await menuRepository.eliminarCategoria(id);
    return response
}
