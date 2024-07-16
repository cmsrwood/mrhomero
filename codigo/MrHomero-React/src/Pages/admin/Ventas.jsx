import React from 'react'
import Buscador from '../../Plantilla/Buscador'

export default function Ventas() {
  return (
    <div className=''>
      <div className=" container p-5">
        <div className="row">
          <h1 className="col-12 col-sm-6">Gestion de ventas</h1>
          <div className="col-12 col-sm-6 position-relative">
           <Buscador icon="search" placeholder="Buscar"/>
          </div>
        </div>
        <table className=" table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
