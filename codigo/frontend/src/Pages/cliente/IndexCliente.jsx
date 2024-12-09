import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/img/banner-nosotros.jpg'
import ciudad from '../../assets/img/ciudad.png'
import logo from '/logo.png'
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


  const token = localStorage.getItem('token')
  const id = JSON.parse(atob(token.split(".")[1])).id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/clientes/mostrarByid/${id}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarProductosMasVendidos/${ano}/${mes}`),
        ])
        setUser(userRes.data);
        setProductosMasVendidos(productosRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, id, ano, mes]);


  return (
    <div className=''>
      <div className="row align-items-center justify-content-center text-center py-5 mb-5" style={{ backgroundImage: `url(${ciudad})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '100%', height: '400px' }} id="banner">
        <div className="col-12 text-center">
          <h1 className='fw-bold d-none d-sm-block'>Bienvenido {user.user_nom}</h1>
          <h2 className='fw-bold text-light'>Gracias por elegirnos</h2>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <Link className='btn btn-warning me-3' to={'/cliente/menu'}>
            <i className="bi bi-list">Menu</i>
          </Link>
          <Link className='btn btn-warning me-3' to={'/cliente/menu'}>
            <i className="bi bi-gift"> Recompensas</i>
          </Link>
        </div>
      </div>

      <div className="container my-5">
        <h2 className='text-center fw-bold my-5'>Productos más vendidos</h2>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4'>
          {productosMasVendidos.map((producto , index) => {
            return (
              index < 4 &&
              <div key={producto.id_producto} className="col wow animate__animated animate__fadeInRight">
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
    </div>
  )
}
