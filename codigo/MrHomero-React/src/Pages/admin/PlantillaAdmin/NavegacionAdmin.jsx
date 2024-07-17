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
        <div class="d-flex">
        <div class="sidebar" id="side_nav">
            <div class="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
                <h1 class="fs-4"><span class="bg-white text-dark rounded shadow px-2 me-2">CL</span> <span
                        class="text-white">Coding League</span></h1>
                <button class="btn d-md-none d-block close-btn px-1 py-0 text-white"><i
                        class="fal fa-stream"></i></button>
            </div>

            <ul class="list-unstyled px-2">
                <li class="active"><a href="#" class="text-decoration-none px-3 py-2 d-block"><i
                            class="fal fa-home"></i> Dashboard</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block"><i class="fal fa-list"></i>
                        Projects</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block d-flex justify-content-between">
                        <span><i class="fal fa-comment"></i> Messages</span>
                        <span class="bg-dark rounded-pill text-white py-0 px-2">02</span>
                    </a>
                </li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block"><i
                            class="fal fa-envelope-open-text"></i> Services</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block"><i class="fal fa-users"></i>
                        Customers</a></li>
            </ul>
            <ul class="list-unstyled px-2">
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block"><i class="fal fa-bars"></i>
                        Settings</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block"><i class="fal fa-bell"></i>
                        Notifications</a></li>

            </ul>

        </div>
        <div class="w-100">
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Mr.Homero</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <small>Hola, Administrador</small>
                        <div class="dropdown pe-5">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-person-square"></i>
                            </button>
                            <button class="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                                <i class="bi bi-person-square"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                        <button className='btn' onClick={tema}><i id="botont" className='bi bi-moon-fill'></i></button>
                    </div>
                </div>
            </nav>

            <div class="dashboard-content px-3 pt-4">
                <h2 class="fs-5"> Dashboard</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, totam? Sequi alias eveniet ut quas
                    ullam delectus et quasi incidunt rem deserunt asperiores reiciendis assumenda doloremque provident,
                    dolores aspernatur neque.</p>
            </div>
        </div>
    </div>
    )
}
