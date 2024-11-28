import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useTema from '../hooks/useTema';
import useCerrarSesion from '../hooks/useCerrarSesion';

export default function NavegacionCliente() {
  const location = useLocation();
  const ruta = location.pathname.split("/")[2];
  const { tema, cambiarTema } = useTema();
  const cerrarSesion = useCerrarSesion();

  function rutaActiva(link) {
    return ruta === link ? "text-warning" : "";
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand text-warning fs-3 ps-2 homero-font" to="/">Mr. Homero</Link>
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
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-square "></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/cliente/perfil">Mi perfil</Link></li>
              <li><Link className="dropdown-item text-danger" to="#" onClick={cerrarSesion}><i className="bi bi-box-arrow-right"></i> Cerrar sesión</Link></li>
            </ul>
          </div>
          <button className='btn' onClick={cambiarTema}><i id="botont" className={`bi bi-${tema === 'light' ? 'sun-fill' : 'moon-fill'}`}></i></button>
        </div>
      </div>
    </nav>
  );
}
