import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'
import axios from 'axios'

export default function Registrar() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: ""

  });

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/registrar", user);
      if (res.status === 200) {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'Cuenta creada correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        navigate("/ingresar");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          title: error.response.data || 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    }
  }

  return (
    <div className="">
      <NavegacionDefault />
      <div className='container px-5'>
        <form onSubmit={handleSubmit}>
          <div className='text-center my-3'>
            <h1 className='text-warning'>Registro</h1>
            <p>Crear una cuenta <br /> <small>Inicia sesion con Google</small></p>
            <button className='btn btn-light rounded-5'><i className="bi bi-google"></i></button>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control " id="floatingInput" placeholder="nombres" name='nombres' onChange={handleChange} />
            <label htmlFor="floatingInput">Nombres</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control " id="floatingInput" placeholder="apellidos" name="apellidos" onChange={handleChange} />
            <label htmlFor="floatingInput">Apellidos</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="email" name='email' onChange={handleChange} />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Contraseña" name='password' onChange={handleChange} />
            <label htmlFor="floatingInput">Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Confirmar contraseña" name='confirmPassword' onChange={handleChange} />
            <label htmlFor="floatingInput">Confirmar contraseña</label>
          </div>
          <div className="text-center">
            <button className="btn btn-dark bg-black w-100 rounded-5 mb-2 py-2" type='submit'>Registrarse</button>
            <p><small> Al registrarte, aceptas nuestras <Link to='/condiciones-de-uso' >Condiciones de uso</Link> y <Link to='/politica-de-privacidad'>Politica de privacidad</Link> </small></p>
            <p className="text-center text-secondary"><small> ¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesion</Link> </small></p>
          </div>
        </form>
      </div>
    </div>
  )
}
