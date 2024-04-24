/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router-dom'
// import logo from './img/logo.png';

export default function NavegacionDefault() {

    function tema(){
    var index = document.getElementById('html');
    var icon = document.getElementById('botont');
        if (index.getAttribute("data-bs-theme") === "light") {
          index.setAttribute("data-bs-theme", "dark");
          icon.setAttribute("class","bi bi-moon-fill")
        }
        else {
          index.setAttribute("data-bs-theme", "light");
          icon.setAttribute("class","bi bi-sun-fill")
        }
      }
      console.log(window.location)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mr.Homero</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
                <Link className="nav-link mx-2" to="/nosotros"><i className="bi bi-people-fill me-1"></i>Nosotros</Link>
                <Link className="nav-link mx-2" to="/menu"><i className="bi bi-list-ul me-1"></i>Menú</Link>
                <Link className="nav-link mx-2" to="/registrar">Crear mi cuenta</Link>
                <Link className="nav-link mx-2" to="/ingresar">Ingresar</Link>
                <button  className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
            </div>
        </div>
        </nav>
    );
}
