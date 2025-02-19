// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Menu() {

    const [categorias, setCategorias] = useState([])
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    const rol = token ? JSON.parse(atob(token.split(".")[1])).rol : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriasRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/tienda/categorias/`),
                ]);
                setCategorias(categoriasRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated]);

    function rutaCategoria(rol, idCategoria) {
        switch (rol) {
            case 3:
                return `/cliente/categoria/${idCategoria}`
            case 2:
                return `/empleado/categoria/${idCategoria}`
            default:
                return `/categoria/${idCategoria}`
        }
    }

    return (
        <div className="">
            <div className="container">
                <h1 className="text-warning text-center mb-4">Menu</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {categorias.map((categoria) => (
                        <div key={categoria.id_categoria} className="col">
                            <div className="card" key={categoria.id_categoria}>
                                <Link to={rutaCategoria(rol, categoria.id_categoria)} className='text-decoration-none'>
                                    <div className="card text-center border-0">
                                        <img loading='lazy' src={`${categoria.cat_foto}`} height={200} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{categoria.cat_nom}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}