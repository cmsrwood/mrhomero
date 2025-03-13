const adminServices = require('../services/adminServices');

exports.mostrarAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await adminServices.mostrarAdmin(id);
        res.status(200).json(response);
    } catch (error) { 
        next(error);
    }
}