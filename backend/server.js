const connectDB = require('./src/config/db');
const createApp = require('./src/app');
const port = process.env.PORT || 4400;

const startServer = async () => {
    try {
        //conectar a la base de datos
        await connectDB();

        //crear la app
        const app = createApp();

        //iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor ejecutando en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }

}

startServer();