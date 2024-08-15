const mysql = require('mysql');
const nodemailer = require('nodemailer');

/* Conectar a la base de datos */
const db = mysql.createPool({
    host: 'mrhomero.cp84e8ay06n5.us-east-2.rds.amazonaws.com',
    user: 'homero',
    password: 'Awsmrhomero',
    database: 'mrhomero',
    connectTimeout: 10000,
    ssl: true
});

/* Verificar la conección */
db.getConnection((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dilanfantas@gmail.com',
        pass: 'jegc hedq jngv tyyg'
    }
});

module.exports = db, transporter