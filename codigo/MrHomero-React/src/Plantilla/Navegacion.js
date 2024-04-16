import React from 'react';
import {Link} from 'react-router-dom'
import logo from './img/logo.png';

export default function Navegacion() {

    function tema(){
    var index = document.getElementById('index');
    var icon = document.getElementById('botont');
        if (index.getAttribute("data-bs-theme") == "light") {
          index.setAttribute("data-bs-theme", "dark");
          icon.setAttribute("class","bi bi-moon-fill")
        }
        else {
          index.setAttribute("data-bs-theme", "light");
          icon.setAttribute("class","bi bi-sun-fill")
        }
      }
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <Link class="navbar-brand" to="/">Mr.Homero</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
                <Link class="nav-link" to="/nosotros">Nosotros</Link>
                <Link class="nav-link" to="/menu">Menú</Link>
                <Link class="nav-link" to="/registrar">Crear mi cuenta</Link>
                <Link class="nav-link" to="/ingresar">Ingresar</Link>
                <button  className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
            </div>
        </div>
        </nav>
    );
}
