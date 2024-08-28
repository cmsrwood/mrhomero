import React from 'react'
import Buscador from '../../components/Buscador'
import Swal from 'sweetalert2'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'

export default function Clientes() {
    function Usuario() {
        return (
            <tr>
                <th scope="row" >1</th>
                <td>User_nom</td>
                <td>User_apel</td>
                <td>user@gmail.com</td>
                <td>3000000000</td>
                <td><button type="button" className="btn btn-danger" onClick={() => {
                    Swal.fire({
                        title: "¿Eliminar Cliente?",
                        text: "¡Se eliminara el cliente!",
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
                                    title: 'Cliente eliminado',
                                    text: 'El cliente fue eliminado correctamente.',
                                    icon: 'success',
                                    confirmButtonText: 'Hecho'
                                })
                            }
                        }
                    )
                }}><i className="bi bi-trash"></i></button></td>
            </tr>
        )
    }

    return (
        <div className="">
            <NavegacionAdmin />
            <div className="container p-5">
                <div className="row">
                    <h1 className="col-12 col-sm-6">Clientes</h1>
                    <div className="col-12 col-sm-6 position-relative">
                        <Buscador icon="search" placeholder="Buscar" />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className=" table table-striped mt-5">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Telefono</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Usuario()}
                            {Usuario()}
                            {Usuario()}
                            {Usuario()}
                            {Usuario()}
                        </tbody>
                    </table>
                </div>
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
