//Repositorio para ingresar

exports.ingresar = async (user) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_email = ? AND user_estado = 1";
        const values = [
            user.email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}