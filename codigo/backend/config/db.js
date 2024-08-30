const mysql = require('mysql');
const nodemailer = require('nodemailer');

/* Conectar a la base de datos */
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'mrhomero',
    connectTimeout: 10000,
    ssl: process.env.DB_SSL || false
});

/* Verificar la conección */
db.getConnection((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

module.exports = db