import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Ventas from '../Ventas'
import IndexAdmin from '../IndexAdmin'
import Dashboard from '../Dashboard'
import Pedidos from '../Pedidos'
import Clientes from '../Clientes'

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
    const [componenteActual, setComponenteActual] = useState('IndexAdmin');

    function cambiarComponente(componente) {
        setComponenteActual(componente);
    }
    return (
        <div className="d-flex position-relative">
            <div className='min-vh-100 bg-dark text-white border-end sidebar' id="sidebar">
            </div>
            <div className='min-vh-100 bg-dark text-white border-end sidebar position-fixed' id="sidebar">
                <h1 className="fs-4 pt-3 pb-4 text-center d-none d-sm-block">Mr. Homero</h1>
                <ul className="px-2 pt-5 mt-4 pt-sm-0 mt-sm-0">
                    <button onClick={() => cambiarComponente('IndexAdmin')} className="nav-link px-3 py-2 d-block">
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Inicio</span>
                    </button>
                    <button className="nav-link px-3 py-2 d-block rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i className="bi bi-wallet2"></i> <span className='d-none d-sm-inline'>Ventas</span>
                    </button>
                    <div className="collapse" id="collapseExample">
                        <Link onClick={() => cambiarComponente('Dashboard')} className="nav-link px-3 py-2 d-block border-top">
                            <i className="bi bi-graph-up"></i> <span className='d-none d-sm-inline'>Analisis de ventas</span>
                        </Link>
                        <Link onClick={() => cambiarComponente('Ventas')} className="nav-link px-3 py-2 d-block ">
                            <i className="bi bi-pencil-square"></i> <span className='d-none d-sm-inline'>Gestion de ventas</span>
                        </Link>
                        <Link onClick={() => cambiarComponente('Pedidos')} className="nav-link px-3 py-2 d-block ">
                            <i className="bi bi-card-checklist"></i> <span className='d-none d-sm-inline'>Pedidos</span>
                        </Link>
                        <Link to="#" className="nav-link px-3 py-2 d-block ">
                            <i className="fa fa-burger"></i> <span className='d-none d-sm-inline'>Menú</span>
                        </Link>
                        <Link to="#" className="nav-link px-3 py-2 d-block  border-bottom">
                            <i className="bi bi-trophy"></i> <span className='d-none d-sm-inline'>Recompensas</span>
                        </Link>
                    </div>
                    <Link to="#" className="nav-link px-3 py-2 d-block ">
                        <i className="bi bi-inboxes"></i> <span className='d-none d-sm-inline'>Inventario</span>
                    </Link>
                    <Link onClick={() => cambiarComponente('Clientes')} className="nav-link px-3 py-2 d-block ">
                        <i className="bi bi-people"></i> <span className='d-none d-sm-inline'>Clientes</span>
                    </Link>
                </ul>
                <ul className="px-2 align-items-end ">
                    <Link to="#" className="nav-link px-3 py-2">
                        <i className="bi bi-gear"></i>
                        <span className='d-none d-sm-inline'>Configuracion</span>
                    </Link>
                    <Link to="#" className="nav-link d-block px-3 py-2">
                        <i className="bi bi-person-square"></i>
                        <span className='d-none d-sm-inline'>Perfil</span>
                    </Link>
                </ul>
            </div>
            <div className="w-100">
                <nav className=" bg-dark navbar navbar-expand-lg px-5 border-bottom"></nav>
                <nav className=" bg-dark navbar navbar-expand-lg px-5 border-bottom fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-white" to="#">Mr. Homero</Link>

                        <small className='text-white d-none d-sm-block fw-bold'>Hola, Administrador</small>
                        <div className="d-flex">
                            <div className="dropdown pe-4">
                                <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-square "></i>
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
                <div className="px-3 pt-5 container">
                    {componenteActual === 'IndexAdmin' && <IndexAdmin />}
                    {componenteActual === 'Dashboard' && <Dashboard />}
                    {componenteActual === 'Ventas' && <Ventas/>}
                    {componenteActual === 'Pedidos' && <Pedidos />}
                    {componenteActual === 'Clientes' && <Clientes/>}


                </div>
            </div>
        </div >
    )
}
