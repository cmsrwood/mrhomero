const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const createApp = () => {

    const app = express();
    // Middlewares

    app.use(cors({
        origin: FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger)

    // Rutas

    app.use('/api', routes);

    // Manejo de errores global

    app.use(errorHandler);

    return app;
}

module.exports = createApp;
