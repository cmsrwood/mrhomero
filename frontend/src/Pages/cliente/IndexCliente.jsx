import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import hamburguesainicio from '../../assets/img/inicio9.jpg';
import moment from 'moment';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function IndexCliente() {

  const navigate = useNavigate();

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  // Traer datos
  const [user, setUser] = useState([]);

  const ano = moment().format('YYYY');
  const mes = moment().format('MM');
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosMasComprados, setProductosMasComprados] = useState([]);


  const token = localStorage.getItem('token')
  const id = JSON.parse(atob(token.split(".")[1])).id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productosMasVendidosRes, productosMasCompradosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/clientes/mostrarByid/${id}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarProductosMasVendidos/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarProductosMasCompradosPorCliente/${id}`),
        ])
        setUser(userRes.data);
        setProductosMasVendidos(productosMasVendidosRes.data);
        setProductosMasComprados(productosMasCompradosRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, id, ano, mes]);


  return (
    <div className=''>
      <div style={{ backgroundImage: `url(${hamburguesainicio})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '100%', height: '90vh' }} id="banner">
        <div id="carrouselIndexCliente" className="carousel slide h-100" data-bs-ride="carousel">
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100" data-bs-interval="5000">
              <div className="container h-100">
                <div className="row h-75 align-items-center align-content-center justify-content-center text-center" >
                  <div className="col-12 text-center">
                    <h1 className='fw-bold'>Bienvenido {user.user_nom}</h1>
                    <h2 className='fw-bold text-light'>Gracias por elegirnos</h2>
                  </div>
                  <div className="col-12 d-flex mt-5 justify-content-center">
                    <Link className='btn btn-warning me-3' to={'/cliente/menu'}>
                      <i className="bi bi-list">Menu</i>
                    </Link>
                    <Link className='btn btn-warning' to={'/cliente/recompensas'}>
                      <i className="bi bi-gift"> Recompensas</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item h-100" data-bs-interval="5000">
              <div className="container h-100">
                <div className="row h-75 align-items-center align-content-center justify-content-center text-center" >
                  <div className="col-12 text-center">
                    <h1 className='fw-bold'>Tienes {user.user_puntos} puntos</h1>
                    <h2 className='fw-bold text-light'>¡Reclama alguna recompensa!</h2>
                  </div>
                  <div className="col-12 d-flex mt-5 justify-content-center">
                    <Link className='btn btn-warning me-3' to={'/cliente/recompensas'}>
                      <i className="bi bi-clock-history"> Recompensas</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item h-100" data-bs-interval="5000">
              <div className="container h-100">
                <div className="row h-75 align-items-center align-content-center justify-content-center text-center" >
                  <div className="col-12 text-center">
                    <h1 className='fw-bold'>El producto que más has comprado</h1>
                    <h2 className='fw-bold text-light'>{productosMasComprados[0]?.pro_nom}</h2>
                  </div>
                  <div className="col-12 d-flex mt-5 justify-content-center">
                    <Link className='btn btn-warning me-3' to={'/cliente/miscompras'}>
                      <i className="bi bi-clock-history"> Mis compras</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carrouselIndexCliente" data-bs-slide="prev">
            <span className="text-warning fs-5" aria-hidden="true"><i className="bi bi-caret-left-square"></i></span>
            <span className="visually-hidden">Next</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carrouselIndexCliente" data-bs-slide="next">
            <span className="text-warning fs-5" aria-hidden="true"><i className="bi bi-caret-right-square"></i></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


      </div>

      <div className="container my-5">
        <h2 className='text-center fw-bold my-5'>Productos más comprados</h2>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5'>
          {productosMasVendidos.map((producto, index) => {
            return (
              index < 4 &&
              <div key={producto.id_producto} className={index < 2 ? "col wow animate__animated animate__fadeInLeft" : "col wow animate__animated animate__fadeInRight"}>
                <div className="card text-center shadow position-relative">
                  <img
                    src={`/images/menu/productos/${producto.pro_foto}`}
                    height={200}
                    className="card-img-top border-bottom border-1"
                    alt={producto.pro_foto}
                  />
                  <div className="card-body">
                    <h5 className="card-title fs-sm-5">{producto.pro_nom}</h5>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {producto.cantidad_vendida ? <span className="fw-bold"><i className="bi bi-fire"></i> {producto.cantidad_vendida}</span> : <span>0</span>}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container my-5">
        <h2 className='text-center fw-bold my-5'>Segun los productos que has comprado</h2>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4'>
          {productosMasComprados.map((producto, index) => {
            return (
              index < 4 &&
              <div key={producto.id_producto} className={index < 2 ? "col wow animate__animated animate__fadeInLeft" : "col wow animate__animated animate__fadeInRight"}>
                <div className="card text-center shadow position-relative">
                  <img
                    src={`/images/menu/productos/${producto.pro_foto}`}
                    height={200}
                    className="card-img-top border-bottom border-1"
                    alt={producto.pro_foto}
                  />
                  <div className="card-body">
                    <h5 className="card-title fs-sm-5">{producto.pro_nom}</h5>
                    <p>Lo has comprado {producto.cantidad_vendida} veces</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
