import React from 'react'
import { Link } from 'react-router-dom'
import MrHomero from '/logo.png'

export default function IndexAdmin() {
  return (
    <div className='container'>
      <div className='text-center'>
            <h1>Mr. Homero | Inicio</h1>
      </div>
      <div className='container border border-2 border-secondary p-3 mb-2'>
        <h3>Bienvenido (usuario)</h3>
        <p>Estas son algunas de las funcuiones más utilizadas por tí</p>
        <div className='row aling items-center'>
          <div className='col'>
            <h5>Ventas</h5> 
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
          </div>
          <div className='col'>
            <h5>Inventario</h5>
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
          </div>
          <div className='col'>
            <h5>Compras</h5>
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
            <Link className='row mx-2'>Prueba</Link>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="row  g-4">
          <div className="col-12 col-sm border border-2  text-center">
            <h3>Visitas del aplicativo</h3>
            <p>hola chiquito</p>
          </div>
          <div className="col-12 col-sm border border-2 text-center mx-0 mx-sm-3">
            <h3>Usuarios registrados</h3>
            <p>hola chiquito¿</p>
          </div>
          <div className="col-12 col-sm border border-2 text-center">
            <h3>Reseñas</h3>
            <p>hola chiquito</p>
          </div>
        </div>
      </div>
    </div>
  )
}
