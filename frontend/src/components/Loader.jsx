import React from 'react'

export default function Loader() {
    return (
        <div className="vh-100 d-block justify-content-center text-center align-items-center align-content-center">
            <div className="spinner-border spinner-border-xl text-warning" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h1 className="me-4">Cargando...</h1>
        </div>
    )
}