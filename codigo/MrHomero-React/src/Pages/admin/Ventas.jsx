import React from 'react'
import Buscador from '../../Plantilla/Buscador'

export default function Ventas() {
  function Fila() {
    return (
      <tr>
        <th scope="row">1</th>
        <td>13/05/2024</td>
        <td>Productos</td>
        <td>Cliente</td>
        <td>20%</td>
        <td>30.000</td>
        <td>
          <div className="d-flex ">
            <button type="button" className="btn btn-outline-warning me-3"><i className="bi bi-pencil-square"></i> </button>
            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash"></i> </button>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className=''>
      <div className=" container p-5">
        <div className="row">
          <h1 className="col-12 col-sm-6">Gestion de ventas</h1>
          <div className="col-12 col-sm-6 position-relative">
            <Buscador icon="search" placeholder="Buscar" />
          </div>
        </div>
        <table className=" table table-striped mt-5">
          <thead>
            <tr>

              <th scope="col">id</th>
              <th scope="col">Fecha</th>
              <th scope="col">Productos</th>
              <th scope="col">Cliente</th>
              <th scope="col">Descuento</th>
              <th scope="col">Valor</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {Fila()}
            {Fila()}
            {Fila()}
            {Fila()}
            {Fila()}
            {Fila()}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link text-warning" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link text-warning" href="#">1</a></li>
            <li class="page-item"><a class="page-link text-warning" href="#">2</a></li>
            <li class="page-item"><a class="page-link text-warning" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link text-warning" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
