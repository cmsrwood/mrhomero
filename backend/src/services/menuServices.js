const menuRepository = require('../repositories/menuRepository');


//Servicio para mostrar las categorias
exports.mostrarCategorias = async () => {
    try {
        return await menuRepository.mostrarCategorias();
    } catch (error) {
        throw new Error(error);
    }
};

//Servicio para mostrar una categoria
exports.mostrarCategoria = async (id) => {
    try {
        return await menuRepository.mostrarCategoria(id);
    } catch (error) {
        throw new Error(error);
    }
};

//Servicio para crear una categoria
exports.crearCategoria = async (categoria, foto) => {
    try {
        const response = await menuRepository.crearCategoria(categoria, foto);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

//Servicio para actualizar una categoria
exports.actualizarCategoria = async (id, foto, categoria) => {
    try {
        const reponse = await menuRepository.actualizarCategoria(id, foto, categoria);
        return reponse
    } catch (error) {
        throw new Error(error);
    }
}

exports.eliminarCategoria = async (id) => {
    try {
        return await menuRepository.eliminarCategoria(id);
    } catch (error) {
        throw new Error(error);
    }
}
