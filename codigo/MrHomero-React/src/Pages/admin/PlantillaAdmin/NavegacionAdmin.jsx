import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Ventas from '../Ventas'

export default function NavegacionAdmin() {
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
    return (
        <div className="d-flex">
            <div className='border-end min-vh-100 pe-sm-auto pe-0 bg-dark text-white'>
                <h1 className="fs-4 pt-3 pb-4 text-center d-none d-sm-block">Mr. Homero</h1>
                <ul className="px-2">
                    <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Ventas</span>
                    </Link>
                    <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Ventas</span>
                    </Link>
                    <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Ventas</span>
                    </Link>
                </ul>
                <ul className="px-2">
                    <li className="">
                        <Link to="#" className="nav-link px-3 py-2">
                            <i className="bi bi-gear"></i>
                            <span className='d-none d-sm-inline'>Configuracion</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="#" className="nav-link d-block px-3 py-2">
                            <i className="bi bi-person-square"></i>
                            <span className='d-none d-sm-inline'>Perfil</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-100">
                <nav className="navbar navbar-expand-lg border-bottom px-5">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Mr.Homero</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                            <small>Hola, Administrador</small>
                            <div className="dropdown pe-5">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-square"></i>
                                </button>
                                <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                                    <i className="bi bi-person-square"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </div>
                            <button className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
                        </div>
                    </div>
                </nav>
                {/* Contenido */}
                <div className="px-3 pt-4">
                    <Ventas />
                </div>
            </div>
        </div>
    )
}
