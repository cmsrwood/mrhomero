import axios from "axios";
const CLOUD_NAME = process.env.CLOUD_NAME || "ditdxw9ic";

const uploadImage = async (file, upload_preset, public_id) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("public_id", public_id);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
        );

        const url_optimizada = response.data.secure_url.replace(
            "/upload/",
            "/upload/f_auto,q_auto:best,w_1200/"
        )

        return url_optimizada
    } catch (error) {
        console.error("Error al subir la imagen:", error);
    }
};

export default uploadImage;
