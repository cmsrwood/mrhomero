import React from 'react'
import Buscador from '../../Plantilla/Buscador'
import Swal from 'sweetalert2'

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
            <button type="button" className="btn btn-outline-warning me-3" data-bs-toggle="modal" data-bs-target="#Modal"><i className="bi bi-pencil-square"></i> </button>
            <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar venta</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <label htmlFor="floatingInput">Productos</label>
                    <input type="text" className="form-control my-2" placeholder="Productos" aria-label="Username" aria-describedby="basic-addon1"></input>
                    <label htmlFor="floatingInput">Descuento</label>
                    <input type="text" className="form-control my-2" placeholder="Descuento" aria-label="Username" aria-describedby="basic-addon1"></input>
                    <label htmlFor="floatingInput">Valor</label>
                    <input type="text" className="form-control my-2" placeholder="Valor" aria-label="Username" aria-describedby="basic-addon1"></input>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-outline-warning" onClick={() => {
                      Swal.fire({
                        title: 'Venta editada',
                        text: 'La venta fue editada correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Hecho'
                      })
                    }}>Confirmar</button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-outline-danger" onClick={() => {
              Swal.fire({
                title: "¿Eliminar venta?",
                text: "¡Se eliminara la venta!",
                icon: "warning",
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
    </div>
  )
}
