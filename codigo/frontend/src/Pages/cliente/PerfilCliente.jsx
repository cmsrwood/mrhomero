import React from 'react'
import NavegacionCliente from '../../navigation/NavegacionCliente'
import img from '../../assets/img/img.png'
import Swal from 'sweetalert2'
export default function PerfilCliente() {
  return (
    <div>
      <NavegacionCliente />
      <div className="container p-5 ">
        <div className='align-items-center text-center pb-3 pt-3'>
            <img src={img} height={300} alt="" className='rounded rounded-circle border border-3 px-3' />
            <input type="file" className="form-control my-3" id="inputGroupFile01"></input>
            <h1>Usuario</h1>
            <div className="row ">
              <div className="col-6">
                <h2>Compras realizadas</h2>
                <h3>0</h3>
              </div>
              <div className="col-6">
                <h2>Puntos acumulados</h2>
                <h3>0</h3>
              </div>
            </div>
            <hr className='border border-3 ' />
        </div>
        <div className='fs-5'> 
          <h1> Información personal</h1>
          <hr className='border border-3 ' />
          <div className="row cols-2">

            <div className="col-6">
              <label className='form-label '>Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre" disabled />
            </div>

            <div className="col-6">
              <label className='form-label '>Email</label>
              <input type="text" className="form-control" placeholder="Email"  />
            </div>

            <div className="col-6 mt-2">
              <label className='form-label '>Telefono</label>
              <input type="text" className="form-control" placeholder="Telefono"  />
            </div>
            <button type="button" className="btn btn-warning w-100 mt-3" onClick={() => 
              { Swal.fire({ 
                title: 'Guardado', 
                text: 'Se han guardado los cambios', 
                icon: 'success', 
                confirmButtonText: 'Hecho' 
                }) }}> <i className="bi bi-pencil-square"></i> Guardar cambios</button>
          </div>
        </div>
       
      </div>
    </div>
  )
}
