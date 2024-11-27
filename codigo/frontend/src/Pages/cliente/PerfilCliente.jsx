import React, { useEffect, useState } from 'react';
import img from '../../assets/img/img.png';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function PerfilCliente() {

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const token = localStorage.getItem('token');
  const id_user = JSON.parse(atob(token.split(".")[1])).id;

  const [user, setUser] = useState([]);
  const [compras , setCompras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, comprasRes ] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/clientes/mostrarByid/${id_user}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarCompras/${id_user}`),
        ])
        setUser(userRes.data);
        setCompras(comprasRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, id_user]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsDataUpdated(true);
  };

  return (
    <div>
      <div className="px-5">
        <div className='align-items-center text-center pb-3 pt-3'>
          <img src={img} height={300} alt="" className='rounded rounded-circle border border-3 px-3' />
          <input type="file" className="form-control my-3" id="inputGroupFile01" />
          <h1>{user.user_nom} {user.user_apels}</h1>
          <div className="row">
            <div className="col-6">
              <h2>Compras realizadas</h2>
              <h3>{compras.length}</h3>
            </div>
            <div className="col-6">
              <h2>Puntos acumulados</h2>
              <h3>{user.user_puntos}</h3>
            </div>
          </div>
          <hr className='border border-3' />
        </div>
        <div className='fs-5' key={user.id_user}>
          <h1> Información personal</h1>
          <hr className='border border-3' />
          <div className="row cols-2">
            <div className="col-6">
              <label className='form-label '>Nombre</label>
              <input type="text" className="form-control" onChange={handleChange} name="user_nom" placeholder="Nombre" defaultValue={user.user_nom} />
            </div>
            <div className="col-6">
              <label className='form-label '>Apellidos</label>
              <input type="text" className="form-control" onChange={handleChange} name="user_apels" placeholder="Apellidos" defaultValue={user.user_apels} />
            </div>
            <div className="col-6">
              <label className='form-label '>Email</label>
              <input type="text" className="form-control" onChange={handleChange} name="user_email" placeholder="Email" defaultValue={user.user_email} />
            </div>
            <div className="col-6 mt-2">
              <label className='form-label '>Telefono</label>
              <input type="text" className="form-control" onChange={handleChange} name="user_tel" placeholder="Telefono" defaultValue={user.user_tel} />
            </div>
            <button type="button" className="btn btn-warning w-100 mt-3" onClick={() => {
              Swal.fire({
                title: 'Guardado',
                text: 'Se han guardado los cambios',
                icon: 'success',
                confirmButtonText: 'Hecho'
              });
            }}>
              <i className="bi bi-pencil-square"></i> Guardar cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
