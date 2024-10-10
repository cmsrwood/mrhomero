import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NavegacionDefault() {
  const location = useLocation();
  const ruta = location.pathname.split("/")[1];

  const temaInicial = localStorage.getItem('tema') || 'dark';
  const [tema, setTema] = useState(temaInicial);

  const ToastTema = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
  });

  useEffect(() => {
    const index = document.documentElement;
    index.setAttribute('data-bs-theme', tema);
  }, []);

  useEffect(() => {
    const index = document.documentElement;
    localStorage.setItem('tema', tema);
    index.setAttribute('data-bs-theme', tema);
  }, [tema]);

  function cambiarTema() {
    const nuevoTema = tema === 'light' ? 'dark' : 'light';
    setTema(nuevoTema);
    ToastTema.fire({
      title: `Tema cambiado a ${nuevoTema}`,
      icon: 'success'
    });
  }

  function rutaActiva(link) {
    return ruta === link ? "text-warning" : "";
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow homero-font mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand text-warning fs-3 ps-2" to="/">Mr. Homero</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <Link className={`nav-link mx-2 ${rutaActiva('nosotros')} fs-5`} to="/nosotros">
            <i className="bi bi-people-fill me-1"></i>Nosotros
          </Link>
          <Link className={`nav-link mx-2 ${rutaActiva('menu')} fs-5`} to="/menu">
            <i className="bi bi-list-ul me-1"></i>Menú
          </Link>
          <Link className={`nav-link mx-2 ${rutaActiva('registrar')} fs-5`} to="/registrar">Crear mi cuenta</Link>
          <Link className={`nav-link mx-2 ${rutaActiva('ingresar')} fs-5`} to="/ingresar">Ingresar</Link>
          <button className='btn' onClick={cambiarTema}>
            <i className={`bi ${tema === 'light' ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
