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
                const res = await axios.get(`${BACKEND_URL}/api/tienda/productos/${idProducto}`);
                setProducto(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idProducto]);

    return (
        <div className=''>
            <div className="container position-relative">
                <div className="row">
                    <div className="col-12 col-sm-5 pt-4">
                        <img loading='lazy' className='rounded-5 w-100 h-100' src={`${producto?.pro_foto}`} alt="" />
                    </div>
                    <div className="col-12 col-sm-7 px-5 py-3">
                        <h2 className='display-5 fw-bold'>{producto?.pro_nom}</h2>
                        <h4 className='py-3'><span className='text-muted'>{producto?.pro_desp}</span></h4>
                        <h4 className='py-3'>{producto?.pro_puntos} puntos</h4>
                        <NumericFormat className='display-5 text-warning' value={producto?.pro_precio} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'$ '} />
                    </div>
                </div>
                <Link to={`/categoria/${producto?.id_categoria}`} className='btn btn-warning position-absolute top-0 end-0 mx-5 my-4'>Volver <i className="bi bi-arrow-left"></i></Link>
            </div>
        </div>
    );

}
