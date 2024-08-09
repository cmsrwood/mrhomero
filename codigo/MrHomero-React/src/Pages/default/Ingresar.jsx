import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'
import Spline from '../default/PlantillaDefault/prueba'


export default function Ingresar() {

  return (
    <div className="">
      <NavegacionDefault />
      <div className='container px-5 text-center my-3'>
        <div className="row">
          <div className="col-12 col-sm-6 border align-content-center align-items-center p-3">
            <h2 className='text-warning'>Ingresar</h2>
            <div className="my-3">
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
              <button className="btn btn-dark bg-black w-100 rounded-5 mb-2 py-2" onClick={() => {
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
          <div className="d-none d-sm-flex col-sm-6 border">
            <div className="my-auto text-center w-100">
              <img src="/logo.png" alt="" className="w-100" />
            </div>
          </div>
<<<<<<< HEAD
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Contraseña" />
            <label htmlFor="floatingInput">Contraseña</label>

          </div>
          <div className="text-center">
            <button className="btn btn-dark bg-black w-100 rounded-5 mb-2 py-2" onClick={() => {
              Swal.fire({
                title: 'Iniciaste sesion',
                text: 'Has iniciado sesion correctamente',
                icon: 'success',
                confirmButtonText: 'Continuar'
              })
            }}>Ingresar</button>
            <p className="text-center text-secondary"><small> ¿No tienes una cuenta? <Link to="/registrar">Registrarte</Link> </small></p>
          </div>
        </form>
=======
        </div>
>>>>>>> 14203e1c17bfc8e2b8c6e0e0d54d827de2f2087c
      </div>
      
    </div>

  )
}
