import React, { useState, useEffect } from 'react'
import Buscador from '../../components/Buscador'
import Swal from 'sweetalert2'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Clientes() {

    const Navigate = useNavigate();

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function getClientes() {
            const res = await axios.get(`${BACKEND_URL}/clientes/mostrar`);
            setClientes(res.data);
        }
        getClientes();
    }, []);


    const borrarCliente = async (id) => {
        try {
            const res = await axios.delete(`${BACKEND_URL}/clientes/borrar/${id}`);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente eliminado exitosamente'
                });
                Navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex">
            <NavegacionAdmin />
            <div className="container content">
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
                            <tr>
                                <th scope="row" >1</th>
                                <td>User_nom</td>
                                <td>User_apel</td>
                                <td>user@gmail.com</td>
                                <td>3000000000</td>
                                <td><button type="button" className="btn btn-danger" ><i className="bi bi-trash"></i></button></td>
                            </tr>
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
