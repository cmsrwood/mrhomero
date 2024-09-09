import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <div className="container text-center vh-100 align-items-center align-content-center">
        <div className="row">
          <div className="col-6 align-items-center">
            <img className='img-fluid' src="/logo.png" alt="" />
          </div>
          <div className="col-6 align-items-center align-content-center">
            <div className="d-flex text-center justify-content-center align-items-center">
              <h1 className="display-1">ERROR 4</h1>
              <div className="spinner-border text-warning fs-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h1 className="display-1">4</h1>
            </div>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Link className='btn btn-warning' to="/">Volver a la página principal</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
