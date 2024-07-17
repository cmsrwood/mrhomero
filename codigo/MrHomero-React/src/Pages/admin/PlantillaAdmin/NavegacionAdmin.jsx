import React from 'react'
import { Link } from 'react-router-dom'

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
            <div className='border-end bg-dark min-vh-100 px-5'>
                <h1 className="fs-4 pt-3 pb-4">Mr. Homero</h1>
                <ul className="list-unstyled px-2">
                    <li className="active"><a href="#" className="text-decoration-none px-3 py-2 d-block"><i
                        className="bi bi-house"></i> Inicio</a></li>
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-list"></i>
                        Projects</a></li>
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block d-flex">
                        <span><i className="fal fa-comment"></i> Messages</span>
                    </a>
                    </li>
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i
                        className="fal fa-envelope-open-text"></i> Services</a></li>
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-users"></i>
                        Customers</a></li>
                </ul>
                <ul className="list-unstyled px-2">
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-bars"></i>
                        Settings</a></li>
                    <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-bell"></i>
                        Notifications</a></li>
                </ul>
            </div>
            <div className="w-100">
                <nav className="navbar navbar-expand-lg border-bottom bg-black px-5">
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
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            <button className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
                        </div>
                    </div>
                </nav>
                {/* Contenido */}
                <div className="px-3 pt-4">
                    <h2 className="fs-5"> Dashboard</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, totam? Sequi alias eveniet ut quas
                        ullam delectus et quasi incidunt rem deserunt asperiores reiciendis assumenda doloremque provident,
                        dolores aspernatur neque.</p>
                </div>
            </div>
        </div>
    )
}
