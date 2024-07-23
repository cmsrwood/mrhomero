import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'

export default function Registrar() {

  function registrar() {
    Swal.fire({
      title: 'Cuenta creada',
      text: 'Ya puedes iniciar sesion',
      icon: 'success',
      confirmButtonText: 'Iniciar sesion'
    })
  }

  return (
    <div className="">
    <NavegacionDefault/>
      <div className='container px-5'>
        <form>
          <div className='text-center my-3'>
            <h2 className='text-warning'>Registro</h2>
            <p>Crear una cuenta <br /> <small>Inicia sesion con Google</small></p>
            <button className='btn btn-light rounded-5'><i className="bi bi-google"></i></button>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control " id="floatingInput" placeholder="nombre" />
            <label htmlFor="floatingInput">Nombre</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="email" />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Contraseña" />
            <label htmlFor="floatingInput">Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Confirmar contraseña" />
            <label htmlFor="floatingInput">Confirmar contraseña</label>
          </div>
          <div className="text-center">
            <button className="btn btn-dark bg-black w-100 rounded-5 mb-2 py-2" onClick={registrar}>Registrarse</button>
            <p><small> Al registrarte, aceptas nuestras <Link to='/condiciones-de-uso' >Condiciones de uso</Link> y <Link to='/politica-de-privacidad'>Politica de privacidad</Link> </small></p>
            <p className="text-center text-secondary"><small> ¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesion</Link> </small></p>
          </div>
        </form>
      </div>
    </div>
  )
}
