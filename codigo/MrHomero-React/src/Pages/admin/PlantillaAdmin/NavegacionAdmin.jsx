import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Ventas from '../Ventas'
import IndexAdmin from '../IndexAdmin'
import Dashboard from '../Dashboard'
import Pedidos from '../Pedidos'
import Clientes from '../Clientes'
import MenuAdmin from '../MenuAdmin'
import Inventario from '../Inventario'
import RecompensasAdmin from '../RecompensasAdmin'
import Empleados from '../Empleados'
import Swal from 'sweetalert2'

export default function NavegacionAdmin() {
    const ToastLuna = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
    })
    var collapse = document.getElementById('collapseVentas');
    function tema() {
        var index = document.getElementById('html');
        var icon = document.getElementById('botont');
        var sidebar = document.getElementById('sidebar');
        if (index.getAttribute("data-bs-theme") === "light") {
            index.setAttribute("data-bs-theme", "dark");
            icon.classList.remove("bi-sun-fill")
            icon.classList.add("bi-moon-fill")
            sidebar.classList.add("border-end")
            ToastLuna.fire({
                title: "<i class='bi bi-moon'> Has cambiado al modo oscuro</i> "
            })
        }
        else {
            index.setAttribute("data-bs-theme", "light");
            icon.classList.remove("bi-moon-fill")
            icon.classList.add("bi-sun-fill")
            sidebar.classList.remove("border-end")
            ToastLuna.fire({
                title: "<i class='bi bi-sun text-white'> Has cambiado al modo claro</i> ",
                background: "#212529",
            })
        }
    }
    const [componenteActual, setComponenteActual] = useState('IndexAdmin');

    function cambiarComponente(componente) {
        setComponenteActual(componente)
    }

    return (
        <div className="d-flex position-relative">
            <div className='min-vh-100 bg-dark text-white border-end sidebar ' id="sidebar">
            </div>
            <div className='min-vh-100 bg-dark text-white border-end sidebar position-fixed shadow' id="sidebar">
                <h1 className="fs-4 pt-3 pb-4 text-center d-none d-sm-block">Mr. Homero</h1>
                <ul className=" pt-5 mt-4 pt-sm-0 mt-sm-0 list-unstyled">
                    <Link onClick={() => cambiarComponente('IndexAdmin')} className={componenteActual === 'IndexAdmin' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="bi bi-house "></i> <span className='d-none d-sm-inline'>Inicio</span>
                    </Link>
                    <Link className={componenteActual === 'Ventas' || componenteActual === 'Dashboard' || componenteActual === 'Pedidos' ? `nav-link ps-3 py-2 d-flex bg-warning w-100 text-start text-dark justify-content-between` : `nav-link ps-3 py-2 d-flex justify-content-between`} data-bs-toggle="collapse" data-bs-target="#collapseVentas">
                        <div className="">
                            <i className="bi bi-wallet2 me-1"></i>
                            <span className='d-none d-sm-inline'>Ventas</span>
                        </div>
                        <i className={collapse?.classList?.contains("show") ? "bi bi-chevron-up pe-3" : "bi bi-chevron-down pe-3"}></i>
                    </Link>
                    <div className="collapse" id="collapseVentas">
                        <Link onClick={() => cambiarComponente('Dashboard')} className={componenteActual === 'Dashboard' ? `nav-link ps-3 py-2 d-block bg-light opacity-75 fw w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                            <i className="bi bi-graph-up"></i> <span className='d-none d-sm-inline'>Analisis de ventas</span>
                        </Link>
                        <Link onClick={() => cambiarComponente('Ventas')} className={componenteActual === 'Ventas' ? `nav-link ps-3 py-2 d-block bg-light opacity-75 w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                            <i className="bi bi-pencil-square"></i> <span className='d-none d-sm-inline'>Gestion de ventas</span>
                        </Link>
                        <Link onClick={() => cambiarComponente('Pedidos')} className={componenteActual === 'Pedidos' ? `nav-link ps-3 py-2 d-block bg-light opacity-75 w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                            <i className="bi bi-card-checklist"></i> <span className='d-none d-sm-inline'>Pedidos</span>
                        </Link>
                    </div>
                    <Link onClick={() => cambiarComponente('Inventario')} className={componenteActual === 'Inventario' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="bi bi-inboxes"></i> <span className='d-none d-sm-inline'>Inventario</span>
                    </Link>

                    <Link onClick={() => cambiarComponente('MenuAdmin')} className={componenteActual === 'MenuAdmin' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="fa fa-burger"></i> <span className='d-none d-sm-inline'>Menú</span>
                    </Link>
                    <Link onClick={() => cambiarComponente('Recompensas')} className={componenteActual === 'Recompensas' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="bi bi-trophy"></i> <span className='d-none d-sm-inline'>Recompensas</span>
                    </Link>
                    <Link onClick={() => cambiarComponente('Clientes')} className={componenteActual === 'Clientes' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="bi bi-people"></i> <span className='d-none d-sm-inline'>Clientes</span>
                    </Link>
                    <Link onClick={() => cambiarComponente('Empleados')} className={componenteActual === 'Empleados' ? `nav-link ps-3 py-2 d-block bg-warning w-100 text-start text-dark` : `nav-link ps-3 py-2 d-block`}>
                        <i className="bi bi-person-vcard"></i> <span className='d-none d-sm-inline'>Empleados</span>
                    </Link>
                </ul>
            </div>
            <div className="w-100">
                <nav className=" bg-dark navbar navbar-expand-lg border-bottom"></nav>
                <nav className=" bg-dark navbar navbar-expand-lg border-bottom fixed-top shadow">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-white" to="#">Mr. Homero</Link>
                        <small className='text-white d-none d-sm-block fw-bold'>Hola, Administrador</small>
                        <div className="d-flex">
                            <div className="dropdown pe-5 me-5">
                                <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-square "></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </div>
                            <button className='btn' onClick={tema} ><i id="botont" className='bi bi-moon-fill'></i></button>
                        </div>
                    </div>
                </nav>
                {/* Contenido */}
                <div className="pt-5 container">
                    {componenteActual === 'IndexAdmin' && <IndexAdmin />}
                    {componenteActual === 'Dashboard' && <Dashboard />}
                    {componenteActual === 'Ventas' && <Ventas />}
                    {componenteActual === 'Pedidos' && <Pedidos />}
                    {componenteActual === 'Inventario' && <Inventario />}
                    {componenteActual === 'MenuAdmin' && <MenuAdmin />}
                    {componenteActual === 'Recompensas' && <RecompensasAdmin />}
                    {componenteActual === 'Clientes' && <Clientes />}
                    {componenteActual === 'Empleados' && <Empleados />}
                </div>
            </div>
        </div>
    )
}
