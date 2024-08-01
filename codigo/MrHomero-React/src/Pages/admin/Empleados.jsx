import React from 'react'
import Buscador from '../../Plantilla/Buscador'
import img from '/img.png';
export default function Empleados() {
  function Empleado() {
    return (
      <div className="card">
        <img src={img} height={200} className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="card-title">Empleado</h3>
        </div>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="row mt-3 ">
        <h2 className="col mt-2 ms-5 ">Empleados
          <i className="bi bi-person-vcard ms-2"></i>
        </h2>
        <div className="col d-flex justify-content-end align-items-center">
          <Buscador icon="bi bi-search" placeholder="Buscar" />
          <button type="button" className="btn btn-outline-success ms-2" data-bs-toggle="modal" data-bs-target="#"><i className="bi bi-plus-circle"></i> Añadir</button>
        </div>
      </div>
      <div className="row cols-2 mt-5">
        <div className="col-4 my-2">
          {Empleado()}
        </div>
        <div className="col-4 my-2">
          {Empleado()}
        </div>
        <div className="col-4 my-2">
          {Empleado()}
        </div>
        <div className="col-4 my-2">
          {Empleado()}
        </div>
      </div>
    </div>
  )
}
