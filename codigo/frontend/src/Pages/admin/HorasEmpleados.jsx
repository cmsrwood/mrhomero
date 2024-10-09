import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Gestionhoras from '../admin/Gestionhoras';
import img from '../../assets/img/img.png'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'



export default function HorasEmpleados() {
  const [showGestionhoras, setShowGestionhoras] = useState(false);


  function Horas() {
    return (
      <div className="card text-center p-2">
        <img src={img} height={200} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="card-title" >Empleado</h3>
            <p className="card-text">Horario de trabajo</p>
          </div>

        </div>
        <Link onClick={() => setShowGestionhoras(true)} type="button" className="btn btn-warning ms-2"><i className="bi bi-info-circle"></i> Información</Link>
      </div>
    )
  }
  return (
    <div className=''>
      {!showGestionhoras ?
        <div className="">
          <h1>Horas Empleados</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
            <div className="col my-2">
              <Horas />
            </div>
            <div className="col my-2">
              <Horas />
            </div>
            <div className="col my-2">
              <Horas />
            </div>
            <div className="col my-2">
              <Horas />
            </div>
            <div className="col my-2">
              <Horas />
            </div>
            <div className="col my-2">
              <Horas />
            </div>
          </div>
        </div>
        : <Gestionhoras />}
    </div>
  )
}
