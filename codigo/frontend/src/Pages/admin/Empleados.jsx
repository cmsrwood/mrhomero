import React, { useEffect, useState } from 'react'
import Buscador from '../../components/Buscador'
import Swal from 'sweetalert2'
import img from '../../assets/img/img.png'
import axios from 'axios'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"


export default function Empleados() {

  const [emp, setEmp] = useState({
    emp_nom: '',
    emp_apellidos: '',
    emp_tel: '',
    emp_email: '',
    emp_fecha_ingreso: '',
  })

  const [empEdit, setEmpEdit] = useState({
    emp_id: 0,
    emp_nom_edit: '',
    emp_apellidos_edit: '',
    emp_tel_edit: '',
    emp_email_edit: '',
    emp_fecha_ingreso: '',

  })
  const [empleados, setEmpleados] = useState([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BACKEND_URL}/api/empleados/crearEmpleado`, emp);
      if (res.status === 200) {
        Swal.fire('Empleado creado', res.data, 'success');
        setEmp({
          emp_nom: '',
          emp_apellidos: '',
          emp_tel: '',
          emp_email: '',
          emp_fecha_ingreso: '',
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
          axios.get(`${BACKEND_URL}/api/empleados/mostrarEmpleados`)
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
      const res = await axios.put(`${BACKEND_URL}/api/empleados/actualizarEmpleado/${empEdit.emp_id}`, empEdit);
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
      emp_nom_edit: empleado.user_nom,
      emp_apellidos_edit: empleado.user_apels,
      emp_tel_edit: empleado.user_tel,
      emp_email_edit: empleado.user_email,
      emp_fecha_ingreso: empleado.user_fecha_registro
    });
  };
  const borrarEmpleado = async (id) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/empleados/borrarEmpleado/${id}`);
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
    <div className=''>
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
                          <input type="text" pattern="^[A-Za-zÁ-ÿÑñ\s]+$" value={emp.emp_nom} className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" name="emp_nom" onChange={handleChange} />
                          <label htmlFor="floatingInput">Apellidos</label>
                          <input type="text" pattern="^[A-Za-zÁ-ÿÑñ\s]+$" value={emp.emp_apellidos} className="form-control my-2" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" name="emp_apellidos" onChange={handleChange} />
                          <label htmlFor="floatingInput">Telefono</label>
                          <input type="text" pattern='^[0-9]+$' value={emp.emp_tel} className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" name="emp_tel" onChange={handleChange} />
                        </div>
                        <div className="col">
                          <label htmlFor="floatingInput">Email</label>
                          <input type="email" className="form-control my-2" value={emp.emp_email} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" name="emp_email" onChange={handleChange} />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="floatingInput">Fecha de ingreso</label>
                          <input type="date" name="emp_fecha_ingreso" value={emp.emp_fecha_ingreso} id="" className="form-control my-2" onChange={handleChange} />
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
                <button type="button" className="btn btn-danger ms-2 w-50" onClick={() => borrarEmpleado(empleado.id_user)}> <i className="bi bi-trash"></i> Eliminar </button>
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
                        <img src={img} height={200} className="card-img-top" alt="..." />
                      </div>
                      <div className="col row" >
                        <div className="col">
                          <label htmlFor="floatingInput">Nombre</label>
                          <input type="text" className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" name="emp_nom_edit" value={empEdit.emp_nom_edit} onChange={handleChangeEdit}></input>
                          <label htmlFor="floatingInput">Apellidos</label>
                          <input type="text" className="form-control my-2" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" name="emp_apellidos_edit" value={empEdit.emp_apellidos_edit} onChange={handleChangeEdit}></input>
                          <label htmlFor="floatingInput">Telefono</label>
                          <input type="text" className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" name="emp_tel_edit" value={empEdit.emp_tel_edit} onChange={handleChangeEdit}></input>
                        </div>
                        <div className="col">
                          <label htmlFor="floatingInput">Email</label>
                          <input type="email" disabled className="form-control my-2" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" name="emp_email_edit" value={empEdit.emp_email_edit} onChange={handleChangeEdit}></input>
                        </div>
                        <div className="mt-2">
                          <label htmlFor="floatingInput">Fecha de ingreso</label>
                          <p className="form-control my-2" >{empEdit.emp_fecha_ingreso}</p>
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

