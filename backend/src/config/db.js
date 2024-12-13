const mysql = require('mysql');


const connectDB = async () => {
    try{
        const connection =   mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'mrhomero',
            connectTimeout: 10000,
            ssl: process.env.DB_SSL ? true : false
        });
        console.log('Conectado a la base de datos');
        global.db = connection;
    }
    catch (error) {
        console.error('Databse connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB