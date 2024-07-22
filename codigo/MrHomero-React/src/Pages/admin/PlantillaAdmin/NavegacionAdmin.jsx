import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Ventas from '../Ventas'
import IndexAdmin from '../IndexAdmin'

export default function NavegacionAdmin() {
    function tema() {
        var index = document.getElementById('html');
        var icon = document.getElementById('botont');
        var sidebar = document.getElementById('sidebar');
        if (index.getAttribute("data-bs-theme") === "light") {
            index.setAttribute("data-bs-theme", "dark");
            icon.setAttribute("class", "bi bi-moon-fill text-white")
            sidebar.setAttribute("class", "min-vh-100 bg-dark text-white border-end sidebar border-end")
        }
        else {
            index.setAttribute("data-bs-theme", "light");
            icon.setAttribute("class", "bi bi-sun-fill text-white")
            sidebar.setAttribute("class", "min-vh-100 bg-dark text-white border-end sidebar border-end border-dark")
        }
    }
    return (
        <div className="d-flex">
            <div className='min-vh-100 bg-dark text-white border-end sidebar' id="sidebar">
                <h1 className="fs-4 pt-3 pb-4 text-center d-none d-sm-block">Mr. Homero</h1>
                <ul className="px-2 pt-5 mt-4 pt-sm-0 mt-sm-0">
                    <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Inicio</span>
                    </Link>
                    <Link className="nav-link px-3 py-2 d-block rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i className="bi bi-wallet2"></i> <span className='d-none d-sm-inline'>Ventas</span>
                    </Link>
                    <div className="collapse" id="collapseExample">
                        <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                            <i className="bi bi-graph-up"></i> <span className='d-none d-sm-inline'>Analisis de ventas</span>
                        </Link>
                        <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                            <i className="bi bi-card-checklist"></i> <span className='d-none d-sm-inline'>Pedidos</span>
                        </Link>
                        <Link to="#" className="nav-link px-3 py-2 d-block submenu">
                            <i className="fa fa-burger"></i> <span className='d-none d-sm-inline'>Menú</span>
                        </Link>
                        <Link to="#" className="nav-link px-3 py-2 d-block submenu border-bottom">
                            <i className="bi bi-trophy"></i> <span className='d-none d-sm-inline'>Recompensas</span>
                        </Link>
                    </div>
                </ul>
                <ul className="px-2 align-items-end">
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
                <nav className=" bg-dark navbar navbar-expand-lg px-5 border-bottom">
                    <div className="container-fluid">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-square "></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Action</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </div>
                        <small className='text-white d-none d-sm-block fw-bold'>Hola, Administrador</small>
                        <button className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
                    </div>
                </nav>
                {/* Contenido */}
                <div className="px-3 pt-4">
                    <IndexAdmin />
                </div>
            </div>
        </div>
    )
}
