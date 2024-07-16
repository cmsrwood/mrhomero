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
        <div>
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


            <div class="alert alert-info d-none d-lg-block">Resize your browser to show the responsive offcanvas toggle.</div>

            <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p class="mb-0">This is content within an <code>.offcanvas-lg</code>.</p>
                </div>
            </div>
        </div>
    )
}
