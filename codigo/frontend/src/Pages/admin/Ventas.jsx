import React from 'react'
import Buscador from '../../components/Buscador'
import Swal from 'sweetalert2'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'

export default function Ventas() {
  function Fila() {
    return (
      <tr>
        {/*Funcion para cada fila */}
        <th scope="row">1</th>
        <td>13/05/2024</td>
        <td>Productos</td>
        <td>Cliente</td>
        <td>20%</td>
        <td>30.000</td>
        <td>
          <div className="d-flex ">            
            {/* Alerta para eliminar venta */}
            <button type="button" className="btn btn-danger" onClick={() => {
              Swal.fire({
                title: "¿Eliminar venta?",
                text: "¡Se eliminara la venta!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, eliminar!",
                cancelButtonText: "Cancelar"
              }).then(
                (result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: 'Venta eliminada',
                      text: 'La venta fue eliminada correctamente.',
                      icon: 'success',
                      confirmButtonText: 'Hecho'
                    })
                  }
                }
              )
            }}><i className="bi bi-trash"></i> </button>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className=''>
      {/* Cuerpo de la pagina */}
      <div className="row">
        <h1 className="col-12 col-sm-6">Gestion de ventas</h1>
        <div className="col-12 col-sm-6 position-relative">
          <Buscador icon="search" placeholder="Buscar" />
        </div>
      </div>
      {/* Tabla  de ventas*/}
      <div className="table-responsive">
        <table className=" table table-striped mt-5">
          <thead>
            <tr>

              <th scope="col">id</th>
              <th scope="col">Fecha</th>
              <th scope="col">Productos</th>
              <th scope="col">Cliente</th>
              <th scope="col">Descuento</th>
              <th scope="col">Valor</th>
              <th scope="col">Eliminar</th>
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
      </div>
      {/* Paginador */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link text-warning" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link text-warning" href="#">1</a></li>
          <li className="page-item"><a className="page-link text-warning" href="#">2</a></li>
          <li className="page-item"><a className="page-link text-warning" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link text-warning" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
