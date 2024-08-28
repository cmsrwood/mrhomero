import React from 'react'
import { Link } from 'react-router-dom'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'

export default function IndexAdmin() {
  return (
    <div className="">
      <NavegacionAdmin />
      <div className='container'>
        <div className='text-center pb-3 pt-3'>
          <h1>Mr. Homero | Inicio</h1>
        </div>
        <div className='container border border-2 border-secondary p-3 mb-2'>
          <h3 className='m-3'>Bienvenido (usuario)</h3>
          <p className='m-3'>Estas son algunas de las funcuiones más utilizadas por tí</p>
          <div className='row aling items-center m-2'>
            <div className='col'>
              <h5>Ventas</h5>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
            </div>
            <div className='col'>
              <h5>Inventario</h5>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
            </div>
            <div className='col'>
              <h5>Compras</h5>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
              <Link className='d-block mx-1'>Prueba</Link>
            </div>
          </div>
        </div>
        <div className='container pt-3'>
          <div className="row  g-4">
            <div className="col-12 col-sm border border-2 border-secondary  text-center">
              <h3 className='pt-4'>Visitas del aplicativo</h3>
              <p className='pt-2'>999 Visitas recientes</p>
              <h4 className='pb-4'>+ 8% este mes</h4>
            </div>
            <div className="col-12 col-sm border border-2 border-secondary text-center mx-0 mx-sm-3">
              <h3 className='pt-4'>Usuarios registrados</h3>
              <p className='pt-2'>483 Uusarios registrados este mes</p>
              <h4 className='pb-4'>+ 14% este mes</h4>
            </div>
            <div className="col-12 col-sm border border-2 border-secondary text-center">
              <h3 className='pt-4'>Reseñas</h3>
              <h4 className='pt-2'>⭐⭐⭐⭐⭐</h4>
              <h4 className='pb-4'>Comentario de Google</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
