import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function CategoriaMenu() {

    const token = localStorage.getItem('token');

    const location = useLocation();
    const categoriaId = token ? location.pathname.split("/")[3] : location.pathname.split("/")[2];

    const [productos, setProductos] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [categoria, setCategoria] = useState(null);

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
                                    <Link to={token ? `/cliente/producto/${producto.id_producto}` : `/producto/${producto.id_producto}`} className="btn btn-success w-100"><i className="bi bi-eye"></i> Ver</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
