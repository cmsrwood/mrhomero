import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Gestionhoras from '../admin/Gestionhoras';
import img from '../../assets/img/img.png'



export default function HorasEmpleados() {
  const [showGestionhoras, setShowGestionhoras] = useState(false);


  function Horas() {
    return (
      <div className="card text-center p-2">
        <img src={img} height={200} className="card-img-top" alt="..." />
        <div className="card-body text-center row justify-content-between">
          <h3 className="card-title col" >Empleado</h3>
          <p className="card-text col mt-2">Horario de trabajo</p>
        </div>
        <Link onClick={() => setShowGestionhoras(true)} type="button" className="btn btn-warning ms-2"><i className="bi bi-info-circle"></i> Información</Link>
      </div>
    )
  }
  return (
    <div>
      {!showGestionhoras ?
        <div className="p-5">
          <h1>Horas Empleados</h1>
          <div className="row cols-3">
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <Horas />
            </div>
          </div>
        </div>
        : <Gestionhoras />}
    </div>
  )
}
