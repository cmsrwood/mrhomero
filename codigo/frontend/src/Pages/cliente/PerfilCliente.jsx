import React, { useEffect, useState } from 'react';
import img from '../../assets/img/img.png';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function PerfilCliente() {

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const token = localStorage.getItem('token');
  const id_user = JSON.parse(atob(token.split(".")[1])).id;

  const [user, setUser] = useState({
    user_nom: '',
    user_apels: '',
    user_email: '',
    user_tel: '',
    user_foto: null,
  });
  const [compras, setCompras] = useState([]);
  
  const [editarUser, setEditarUser] = useState({
    user_nom: '',
    user_apels: '',
    user_email: '',
    user_tel: '',
    user_foto: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, comprasRes] = await Promise.all([
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
    setEditarUser({ ...editarUser, [e.target.name]: e.target.value });
    setIsDataUpdated(true);
  };

  const handleFileChange = (e) => {
    setEditarUser({ ...editarUser, user_foto: e.target.files[0] });
    setIsDataUpdated(true);
  };


  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('usuario_nombre', editarUser.user_nom);
    formData.append('usuario_apellidos', editarUser.user_apels);
    formData.append('usuario_email', editarUser.user_email);
    formData.append('usuario_telefono', editarUser.user_tel);

    if (editarUser.user_foto) {
      formData.append('foto', editarUser.user_foto);
    }

    try {
      const res = await axios.put(`${BACKEND_URL}/api/clientes/actualizar/${id}`, formData);
      if (res.status === 200) {
        Swal.fire('Exito', 'Cliente editado correctamente', 'success');
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data || 'error');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_nom', user.user_nom);
    formData.append('user_apels', user.user_apels);
    formData.append('user_email', user.user_email);
    formData.append('user_tel', user.user_tel);
    formData.append('user_foto', user.user_foto);
    try {
      const res = await axios.put(`${BACKEND_URL}/api/clientes/actualizar/${id_user}`, formData);
      if (res.status === 200) {
        Swal.fire({
          title: 'Guardado',
          text: 'Se han guardado los cambios',
          icon: 'success',
          confirmButtonText: 'Hecho'
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="px-5">
        <form action="" >
          <div className='align-items-center text-center pb-3 pt-3'>
            <img src={`/images/clientes/${user.user_foto}`} height={300} alt="" className='rounded rounded-circle border border-3 px-3' />
            <input type="file" className="form-control my-3" id="inputGroupFile01" onChange={handleFileChange}  name='user_foto'/>
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
                <input type="text" className="form-control" onChange={handleChange} name="user_nom" placeholder={user.user_nom} value={editarUser.user_nom} required/>
              </div>
              <div className="col-6">
                <label className='form-label '>Apellidos</label>
                <input type="text" className="form-control" onChange={handleChange} name="user_apels" placeholder={user.user_apels} value={editarUser.user_apels} required />
              </div>
              <div className="col-6">
                <label className='form-label '>Email</label>
                <input type="text" className="form-control" onChange={handleChange} name="user_email" placeholder={user.user_email}  value={editarUser.user_email} required/>
              </div>
              <div className="col-6 mt-2">
                <label className='form-label '>Telefono</label>
                <input type="text" className="form-control" onChange={handleChange} name="user_tel" placeholder={user.user_tel} value={editarUser.user_tel}  required/>
              </div>
              <button type="submit" className="btn btn-warning w-100 mt-3" onClick={() => handleEdit(user.id_user)}>
                <i className="bi bi-pencil-square"></i> Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
