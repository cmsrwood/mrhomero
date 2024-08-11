const mysql = require('mysql');

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

module.exports = db