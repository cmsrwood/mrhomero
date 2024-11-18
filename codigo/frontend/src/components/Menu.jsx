// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';
import img from '../assets/img/img.png';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Menu() {

    const [categorias, setCategorias] = useState([])
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriasRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/menu/mostrarCategorias`),
                ]);
                setCategorias(categoriasRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated]);

    return (
        <div className="">
            <div className="container">
                <h1 className="text-warning text-center mb-4">Menu</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {categorias.map((categoria) => (
                        <div className="col">
                            <div className="card" key={categoria.id_categoria}>
                                <Link to={`/menu/${categoria.cat_nom}`} style={{ textDecoration: 'none' }}>
                                    <div className="card text-center border-0">
                                        <img src={`/images/menu/categorias/${categoria.cat_foto}`} height={200} className="card-img-top" alt="..." />
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