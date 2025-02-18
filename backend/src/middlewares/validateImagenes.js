const multer = require('multer');
const path = require('path');

const { BadRequestError } = require('../errors/ExceptionErrors');

const validateImagen = (req, res, next) => {
    const file = req.file;
    const upload_preset = req.body.upload_preset;
    const public_id = req.body.public_id;

    const err = [];

    if (!file) {
        err.push('Falta paramétro: file');
    }

    if (!upload_preset) {
        err.push('Falta paramétro: upload_preset');
    }

    if (!public_id) {
        err.push('Falta paramétro: public_id');
    }

    if (err.length > 0) {
        throw new BadRequestError(err);
    }
    next();
};
// Configurar multer para guardar archivos temporalmente
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Filtrar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no permitido'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = {
    validateImagen,
    upload
};