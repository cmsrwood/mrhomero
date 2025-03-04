const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Mr. Homero",
            version: "1.0.0",
            description: "Documentación de la API de Mr. Homero",
        },
        servers: [
            {
                url: "http://localhost:4400/api",
            },
        ],
    },
    apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
