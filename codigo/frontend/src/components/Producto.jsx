import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Producto() {
    const [producto, setProducto] = useState(null);
    const location = useLocation();
    const token = localStorage.getItem('token');
    const idProducto = token ? location.pathname.split("/")[3] : location.pathname.split("/")[2];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/productos/mostrarProducto/${idProducto}`);
                setProducto(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idProducto]);

    return (
        <div className=''>
            <div className="row ">
                <div className="col-5 pt-4">
                    <img className='img-fluid rounded' src={`/images/menu/productos/${producto?.pro_foto}`} alt="" />
                </div>
                <div className="col-7 px-5 py-3">
                    <h2 className='display-5 fw-bold'>{producto?.pro_nom}</h2>
                    <h4 className='py-3'>{producto?.pro_desp}</h4>
                    <NumericFormat className='display-5 text-warning' value={producto?.pro_precio} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'$ '} />
                </div>
            </div>
        </div>
    );

}
