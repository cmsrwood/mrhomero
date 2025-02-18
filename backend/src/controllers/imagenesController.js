const imagenesServices = require('../services/imagenesServices');

exports.subirImagen = async (req, res) => {
    try {
        const file = req.file;
        const upload_preset = req.body.upload_preset;
        const public_id = req.body.public_id;
        const imageUrl = await imagenesServices.subirImagen(file.path, upload_preset, public_id);

        res.status(200).json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.eliminarImagen = async (req, res) => {
    try {
        const public_id = req.params.public_id;
        await imagenesServices.eliminarImagen(public_id);
        res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};