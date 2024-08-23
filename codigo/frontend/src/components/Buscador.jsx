import React from 'react'

export default function Buscador({icon, placeholder}) {
    return (
        <div className="search-input position-relative">
            <input type="search" className="form-control form-control-lg ps-5" placeholder={placeholder} />
            <i className= {`${icon} position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary`}></i>
        </div>
    )
}
