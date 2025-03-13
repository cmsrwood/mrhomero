const adminRepository = require('../repositories/adminRepository');

exports.mostrarAdmin = async (id) => {
    const response = await adminRepository.mostrarAdmin(id);
    return response;
}