import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

const RutaPrivada = ({ requiredRole }) => {
    const [isAuth, setIsAuth] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const validarToken = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const res = await axios.get(`${BACKEND_URL}/api/auth/validarToken`, config);
                setIsAuth(true);
                setUserRole(res.data.rol);
            } catch (err) {
                console.error(err);
                setIsAuth(false);
                localStorage.removeItem('token');
                alert("No se pudo validar la sesión. Por favor, inicia sesión nuevamente.");
            }
        };


        if (token) {
            validarToken();
        } else {
            setIsAuth(false);
        }
    }, [token]);

    if (isAuth === null) {
        return <div>Verificando autenticación...</div>; // O un spinner
    }

    if (!isAuth) {
        return <Navigate to="/ingresar" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/ingresar" />;
    }

    return <Outlet />;
};

export default RutaPrivada;
