import React, { useState, useEffect } from 'react';
import NavegacionAdmin from '../../navigation/NavegacionAdmin';
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function ProductoAdmin() {
    const [producto, setProducto] = useState(null);
    const location = useLocation();
    const idProducto = location.pathname.split("/")[3];

    console.log (producto);
    console.log (idProducto);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/productos/mostrarProducto/${idProducto}`);
                setProducto(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idProducto]);

    return (
        <div className='d-flex'>
            <NavegacionAdmin />
            <div className="container content">
                <h1>{producto.pro_nom}</h1>
            </div>
        </div>
    );
}
