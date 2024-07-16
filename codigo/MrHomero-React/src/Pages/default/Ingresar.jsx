import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'

export default function Ingresar() {
  return (
    <div className="">
      <NavegacionDefault/>
      <div className='container px-5'>
        <form >
          <div className='text-center my-3'>
            <h2 className='text-warning'>Ingresar</h2>
            <p><small>Inicia sesion con Google</small></p>
            <button className='btn btn-light rounded-5'><i className="bi bi-google"></i></button>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="email" />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Contraseña" />
            <label htmlFor="floatingInput">Contraseña</label>
          </div>
          <div className="text-center">
            <button className="btn btn-dark bg-black w-100 rounded-5 mb-2 py-2" >Ingresar</button>
            <p className="text-center text-secondary"><small> ¿No tienes una cuenta? <Link to="/registrar">Registrarte</Link> </small></p>
          </div>
        </form>
      </div>
    </div>
  )
}
