import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function CategoriaMenu() {

    const token = localStorage.getItem('token');
    const rol = JSON.parse(atob(token.split(".")[1])).rol;
    
    const location = useLocation();
    const categoriaId = token ? location.pathname.split("/")[3] : location.pathname.split("/")[2];

    const [productos, setProductos] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [categoria, setCategoria] = useState(null);

    function rutaCategoria(rol, idProducto) {
        switch (rol) {
            case 3:
                return `/cliente/producto/${idProducto}`
            case 2:
                return `/empleado/producto/${idProducto}`
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productosRes, categoriaRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/productos/mostrarProductos/${categoriaId}`),
                    axios.get(`${BACKEND_URL}/api/menu/mostrarCategoria/${categoriaId}`),
                ]);
                setProductos(productosRes.data);
                setCategoria(categoriaRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated, categoriaId]);

    return (
        <div className="container justify-content-between">
            <div className="d-flex justify-content-between mb-5">
                <h1>{categoria?.cat_nom}</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                {productos.map((producto) => (
                    <Link to={rutaCategoria(rol, producto.id_producto)} className="text-decoration-none">
                        <div className="col my-2" key={producto.id_producto}>
                            <div className="card text-center p-2">
                                <img src={`/images/menu/productos/${producto.pro_foto}`} height={200} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <div className=" justify-content-between align-productos-center">
                                        <h3 className="card-title">{producto.pro_nom}</h3>
                                        <div className="row">
                                            <div className="col">
                                                <NumericFormat value={producto.pro_precio} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'$ '} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-cols-3">
                                    {/* Botón para ver */}
                                    <div className="col">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )
}
