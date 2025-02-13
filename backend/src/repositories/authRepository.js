//Repositorio para ingresar

exports.ingresar = async (user) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_email = ?";
        const values = [
            user.email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

exports.traerClientePorEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM usuarios WHERE user_email = ?";
        const values = [
            email
        ];
        global.db.query(q, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

exports.registrar = async (user) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO usuarios SET ?";
        global.db.query(q, user, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}