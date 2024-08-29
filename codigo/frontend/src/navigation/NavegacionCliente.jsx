import React from 'react';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
// import logo from './img/logo.png';

export default function NavegacionCliente() {
  const location = useLocation();
  const ruta = location.pathname.split("/")[2];

  function tema() {
    var index = document.getElementById('html');
    var icon = document.getElementById('botont');
    if (index.getAttribute("data-bs-theme") === "light") {
      index.setAttribute("data-bs-theme", "dark");
      icon.setAttribute("class", "bi bi-moon-fill")
    }
    else {
      index.setAttribute("data-bs-theme", "light");
      icon.setAttribute("class", "bi bi-sun-fill")
    }
  }

  function rutaActiva(link) {
    if (ruta === link) {
      return "text-warning"
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand  text-warning fs-3 ps-2 homero-font" to="/admin/">Mr. Homero</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <Link className={`nav-link mx-2 homero-font ${rutaActiva('nosotros')} fs-5`} to="/cliente/nosotros"><i className="bi bi-people-fill me-1 "></i>Nosotros</Link>
          <Link className={`nav-link mx-2 homero-font ${rutaActiva('menu')} fs-5`} to="/cliente/menu"><i className="bi bi-list-ul me-1"></i>Menú</Link>
          <Link className={`nav-link mx-2 homero-font ${rutaActiva('recompensas')} fs-5`} to="/cliente/recompensas"><i className="bi bi-gift me-1"></i>Recompensas</Link>
          <Link className={`nav-link mx-2 homero-font ${rutaActiva('miscompras')} fs-5`} to="/cliente/miscompras"><i className="bi bi-clock-history me-1"></i>Mis compras</Link>
          <div className="dropdown me-1 pe-5">
            <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-square "></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="#">Mi perfil</Link></li>
              <li><Link className="dropdown-item" to="#">Configuración</Link></li>
              <li><Link className="dropdown-item text-danger" to="#"><i className="bi bi-box-arrow-right"></i> Cerrar sesión</Link></li>
            </ul>
          </div>
          <button className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
        </div>
      </div>
    </nav>
  );
}
