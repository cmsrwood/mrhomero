import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({ children }) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    return token ? children : <Navigate to="/ingresar" />; // Redirigir a /ingresar si no hay token
};

export default RutaPrivada;