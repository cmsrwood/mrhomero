import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkNav({ texto, icono, componente }) {
    
    return (
        <Link onClick={() => cambiarComponente(componente)} className="nav-link px-3 py-2 d-block ">
            <i className={`bi bi-${icono}`}></i> <span className='d-none d-sm-inline'>{texto}</span>
        </Link>
    )
}
