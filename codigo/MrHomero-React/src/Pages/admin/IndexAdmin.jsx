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
            <Link>Prueba</Link>
            <Link>Prueba</Link>
            <Link>Prueba</Link>
          </div>
          <div className='col'>
            <h5>Inventario</h5>
            <Link>Prueba</Link>
            <Link>Prueba</Link>
            <Link>Prueba</Link>
          </div>
          <div className='col'>
            <h5>Compras</h5>
            <Link>Prueba</Link>
            <Link>Prueba</Link>
            <Link>Prueba</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
