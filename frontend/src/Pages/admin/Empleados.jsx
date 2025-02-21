import React, { useEffect, useState } from 'react'
import Buscador from '../../components/Buscador'
import Swal from 'sweetalert2'
import axios from 'axios'
import img from '../../assets/img/img.png'

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Empleados() {

  const [emp, setEmp] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    registro: '',
  })

  const [empEdit, setEmpEdit] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    registro: '',
    emp_foto: null,
  })

  const [empleados, setEmpleados] = useState([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BACKEND_URL}/api/personas/empleados/crear`, emp);
      if (res.status === 200) {
        Swal.fire('Empleado creado', res.data, 'success');
        setEmp({
          nombre: '',
          apellidos: '',
          telefono: '',
          email: '',
          registro: '',
        });
        setIsDataUpdated(true);

        const modalElement = document.getElementById('Añadir');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.title,
        text: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    const fechData = async () => {
      try {
        const [empleadosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/personas/empleados/`)
        ]);
        setEmpleados(empleadosRes.data)
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);

    };
    fechData();
  }, [isDataUpdated]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BACKEND_URL}/api/personas/empleados/actualizar/`, empEdit);
      if (res.status === 200) {
        Swal.fire('Empleado editado', res.data, 'success');
        setIsDataUpdated(true);
      }
      const modalElement = document.getElementById('Gestionar');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire('Error', error.response.data, 'error');
      }
    }
  }
  const handleChangeEdit = (e) => {
    setEmpEdit({ ...empEdit, [e.target.name]: e.target.value })
  }
  const OpenEditModal = (empleado) => {
    setEmpEdit({
      id: empleado.id_user,
      nombre: empleado.user_nom,
      apellidos: empleado.user_apels,
      telefono: empleado.user_tel,
      email: empleado.user_email,
      registro: empleado.user_fecha_registro,
    });
  };
  const eliminarEmpleado = async (id) => {
    try {
      const response = await Swal.fire({
        title: '¿Estas seguro de eliminar este empleado?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar'
      })
      if (!response.isConfirmed) {
        return;
      }
      const res = await axios.put(`${BACKEND_URL}/api/personas/empleados/eliminar/${id}`);
      if (res.status === 200) {
        Swal.fire('Empleado eliminado', res.data, 'success');
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire('Error', error.response.data, 'error');
      }
    }
  };


  return (
    <div className='animate__animated animate__fadeIn'>
      <div className="row">
        <h1 className="col">Empleados
        </h1>
        <div className="col d-flex justify-content-end align-items-center">
          <Buscador icon="bi bi-search" placeholder="Buscar" />
          <button type="button" className="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#Añadir"><i className="bi bi-plus-circle"></i> Añadir</button>

          {/* Modal para añadir Empleados */}
          <div className="modal fade" id="Añadir" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Empleado</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-3">
                        <img src={img} height={200} className="card-img-top" alt="..." />
                      </div>
                      <div className="col row" >
                        <div className="col">
                          <label htmlFor="floatingInput">Nombre</label>
                          <input type="text" pattern="^[A-Za-zÁ-ÿÑñ\s]+$" value={emp.nombre} className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" name="nombre" onChange={handleChange} />
                          <label htmlFor="floatingInput">Apellidos</label>
                          <input type="text" pattern="^[A-Za-zÁ-ÿÑñ\s]+$" value={emp.apellidos} className="form-control my-2" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" name="apellidos" onChange={handleChange} />
                          <label htmlFor="floatingInput">Telefono</label>
                          <input type="text" pattern='^[0-9]+$' value={emp.telefono} className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" name="telefono" onChange={handleChange} />
                        </div>
                        <div className="col">
                          <label htmlFor="floatingInput">Email</label>
                          <input type="email" className="form-control my-2" value={emp.email} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" name="email" onChange={handleChange} />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="floatingInput">Fecha de ingreso</label>
                          <input type="date" name="registro" value={emp.registro} id="" className="form-control my-2" onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                      <button type="submit" className="btn btn-warning" >Confirmar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row">
          {empleados.map((empleado) => (
            <div className="col my-2" key={empleado.id_user}>
              <div className="card p-2">
                <div className="card-body">
                  <h3 className="card-title">{empleado.user_nom} {empleado.user_apels}</h3>
                </div>
              </div>
              <div className="d-flex">
                <button type="button" className="btn btn-warning ms-2 w-50" data-bs-toggle="modal" data-bs-target="#Gestionar" onClick={() => OpenEditModal(empleado)}><i className="bi bi-plus-circle"></i> Gestionar</button>
                <button type="button" className="btn btn-danger ms-2 w-50" onClick={() => eliminarEmpleado(empleado.id_user)}> <i className="bi bi-trash"></i> Eliminar </button>
              </div>
            </div>
          ))}

          {/* Modal para gestionar Empleados */}
          <div className="modal fade" id="Gestionar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Editar información Empleado</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={handleEdit}>
                    <div className="row">
                      <div className="col-3">
                        <img src={`${empEdit.emp_foto}`} height={200} className="card-img-top" alt="..." />
                      </div>
                      <div className="col row" >
                        <div className="col">
                          <label htmlFor="floatingInput">Nombre</label>
                          <input type="text" className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" name="nombre" value={empEdit.nombre} onChange={handleChangeEdit}></input>
                          <label htmlFor="floatingInput">Apellidos</label>
                          <input type="text" className="form-control my-2" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" name="apellidos" value={empEdit.apellidos} onChange={handleChangeEdit}></input>
                          <label htmlFor="floatingInput">Telefono</label>
                          <input type="text" className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" name="telefono" value={empEdit.telefono} onChange={handleChangeEdit}></input>
                        </div>
                        <div className="col">
                          <label htmlFor="floatingInput">Email</label>
                          <input type="email" disabled className="form-control my-2" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" name="email" value={empEdit.email} onChange={handleChangeEdit}></input>
                        </div>
                        <div className="mt-2">
                          <label htmlFor="floatingInput">Fecha de ingreso</label>
                          <p className="form-control my-2" >{empEdit.registro}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                      <button type="submit" className="btn btn-warning" >Guardar cambios</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

