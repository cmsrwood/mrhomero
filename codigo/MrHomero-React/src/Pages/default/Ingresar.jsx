import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'
import Spline from '../default/PlantillaDefault/Hamburguesa'
import axios from 'axios'

export default function Ingresar() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/ingresar", user);
      // Credenciales correctas  
      if (res.status === 200) {
        Swal.fire({
          title: 'Iniciaste sesión',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        navigate("/menu");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Credenciales incorrectas
        Swal.fire({
          title: error.response.data || 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta, error del lado del cliente
        Swal.fire({
          title: 'Error',
          text: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else {
        // Algo ocurrió al configurar la solicitud que desencadenó un error
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al procesar tu solicitud.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    }
  };

  return (
    <div className="">
      <NavegacionDefault />
      <div className='container-fluid p-5 my-5 text-center border wipe-in-down' transition-style="in:wipe:up" style={{ borderRadius: '20px', width: '85%', boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.3)' }}>
        <div className="row">
          <div className="col-12 col-sm-5 align-content-center align-items-center p-5" style={{ boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.2)' }}>
            <form onSubmit={handleSubmit}>
              <i className='display-1 bi bi-person-circle'></i>
              <div className="form-floating my-5">
                <input type="email" className="form-control" placeholder="email" name='email' onChange={handleChange} />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating my-5">
                <input type="password" className="form-control" placeholder="Contraseña" name='password' onChange={handleChange} />
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
                  <Link to="/EmailRecuperar">¿Olvidaste tu contraseña?</Link>
                </div>
                <button type="submit" className="btn btn-warning w-100 rounded-5 mb-2 py-2">Ingresar</button>
                <p className="text-center text-secondary"><small> ¿No tienes una cuenta? <Link to="/registrar">Registrarte</Link> </small></p>
              </div>
            </form>
          </div>
          <div className="d-none d-sm-flex col-sm-7">
            <div className="my-auto text-center w-100">
              <Spline />
              <h1 className='text-end homero-font fs-1 text-warning'>Mr. Homero</h1>
              <p className='text-end homero-font fs-5'>Si lo que buscas es sabor Mr. Homero es el mejor</p>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
