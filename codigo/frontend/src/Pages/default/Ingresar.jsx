import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Spline from './Hamburguesa';
import axios from 'axios';
import Loader from '../../components/Loader';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Ingresar() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar carga

    // Validar campos
    if (!user.email || !user.password) {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'Intentar de nuevo'
      });
      setLoading(false); // Detener carga
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/ingresar`, user);
      if (res.status === 200) {
        console.log(res.data);
        const token = res.data.token;
        const rol = res.data.rol;

        // Guardar el token en el localStorage
        localStorage.setItem('token', token);

        Swal.fire({
          title: 'Has iniciado sesión correctamente',
          text: 'Bienvenido',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });

        // Redireccionar según el rol
        switch (rol) {
          case 1:
            navigate('/admin/');
            break;
          case 2:
            navigate('/empleado/');
            break;
          case 3:
            navigate('/cliente/');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          title: error.response.data || 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else if (error.request) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al procesar tu solicitud.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className='container-fluid p-0 p-sm-5 py-0 py-sm-1 text-center wipe-in-down' style={{ width: '85%' }}>
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-12 col-sm-5 align-content-center align-items-center px-5 py-4 shadow-lg rounded-3">
              <form onSubmit={handleSubmit}>
                <div className="form-floating my-5">
                  <input value={user.email} type="email" className="form-control" placeholder="email" name='email' onChange={handleChange} required />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating my-5">
                  <input type="password" className="form-control" placeholder="Contraseña" name='password' onChange={handleChange} required />
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
        )}
      </div>
    </div>
  );
}
