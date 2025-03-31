import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function RutaPrivada ({ requiredRole }) {
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Su sesión ha expirado. Por favor, inicia sesión de nuevo.',
                })
            }
        };


        if (token) {
            validarToken();
        } else {
            setIsAuth(false);
        }
    }, [token]);

    if (isAuth === null) {
        return <div></div>;
    }

    if (!isAuth) {
        return <Navigate to="/ingresar" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/ingresar" />;
    }

    return <Outlet />;
};