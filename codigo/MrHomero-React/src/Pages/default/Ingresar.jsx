import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'
import Spline from '../default/PlantillaDefault/prueba'


export default function Ingresar() {

  return (
    <div className="">
      <NavegacionDefault />
      <div className='container-fluid p-5 my-5 text-center '>
        <div className="row">
          <div className="col-12 col-sm-5 align-content-center align-items-center p-5 border-end border-1">
            <i className='display-1 bi bi-person-circle'></i>
            <div className="form-floating my-5">
              <input type="email" className="form-control" id="floatingInput" placeholder="email" />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating my-5">
              <input type="password" className="form-control" id="floatingInput" placeholder="Contraseña" />
              <label htmlFor="floatingInput">Contraseña</label>
            </div>
            <div className="text-center">
              <div className="d-flex justify-content-between my-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recordarme
                  </label>
                </div>
                <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
              </div>
              <button className="btn btn-warning w-100 rounded-5 mb-2 py-2" onClick={() => {
                Swal.fire({
                  title: 'Iniciaste sesion',
                  text: 'Has iniciado sesion correctamente',
                  icon: 'success',
                  confirmButtonText: 'Continuar'
                })
              }}>Ingresar</button>
              <p className="text-center text-secondary"><small> ¿No tienes una cuenta? <Link to="/registrar">Registrarte</Link> </small></p>
            </div>
          </div>
          <div className="d-none d-sm-flex col-sm-7">
            <div className="my-auto text-center w-100">
            <Spline />
              <h1 className='text-end'>Mr. Homero</h1>
              <p className='text-end'>Si lo que buscas es sabor Mr. Homero es el mejor</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
