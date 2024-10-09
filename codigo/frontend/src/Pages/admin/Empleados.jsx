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
        setIsDataUpdated(true);
      }
      const modalElement = document.getElementById('Añadir');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
      if (error.response) {
        Swal.fire('Error', error.response.data, 'error');
      }
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
                  <form action=""
                    onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-3">
                        <img src={img} height={200} className="card-img-top" alt="..." />
                      </div>
                      <div className="col row" >
                        <div className="col">
                          <label htmlFor="floatingInput">Nombre</label>
                          <input type="text" className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" name="emp_nom" onChange={handleChange}></input>
                          <label htmlFor="floatingInput">Apellidos</label>
                          <input type="text" className="form-control my-2" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" name="emp_apellidos" onChange={handleChange}></input>
                          <label htmlFor="floatingInput">Telefono</label>
                          <input type="text" className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" name="emp_tel" onChange={handleChange}></input>
                        </div>
                        <div className="col">
                          <label htmlFor="floatingInput">Email</label>
                          <input type="text" className="form-control my-2" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" name="emp_email" onChange={handleChange}></input>
                          <label htmlFor="floatingInput">Numero de documento</label>
                          <input type="text" className="form-control my-2" placeholder="Numero de documento" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="mt-2">
                          <label htmlFor="floatingInput">Fecha de ingreso</label>
                          <input type="date" name="emp_fecha_ingreso" id="" className="form-control my-2" onChange={handleChange} />
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
                  <h3 className="card-title">{empleado.user_nom}</h3>
                </div>
              </div>
              <div className="d-flex">
                <button type="button" className="btn btn-warning ms-2 w-50" data-bs-toggle="modal" data-bs-target="#Gestionar"><i className="bi bi-plus-circle"></i> Gestionar</button>
                <button type="button" className="btn btn-danger ms-2 w-50"> <i className="bi bi-trash"></i> Eliminar </button>
              </div>
            </div>
          ))}
          <div className="modal fade" id="Gestionar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Editar información Empleado</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-3">
                      <img src={img} height={200} className="card-img-top" alt="..." />
                    </div>
                    <div className="col row" >
                      <div className="col">
                        <label htmlFor="floatingInput">Nombre</label>
                        <input type="text" className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"></input>
                        <label htmlFor="floatingInput">Telefono</label><input type="text" className="form-control my-2" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>
                      <div className="col">
                        <label htmlFor="floatingInput">Email</label>
                        <input type="text" className="form-control my-2" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                        <label htmlFor="floatingInput">Numero de documento</label>
                        <input type="text" className="form-control my-2" placeholder="Numero de documento" aria-label="Username" aria-describedby="basic-addon1"></input>
                      </div>
                      <div className="mt-2">
                        <label htmlFor="floatingInput">Fecha de ingreso</label>
                        <input disabled type="date" name="emp_fecha_ingreso" id="" className="form-control my-2" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-warning" >Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

