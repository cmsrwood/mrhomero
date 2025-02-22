import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerms] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [estadoFiltro, setEstadoFiltro] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/personas/clientes/`);
                setClientes(res.data);
                setIsDataUpdated(false);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        };

        fetchData();
    }, [isDataUpdated]);

    function filtrarClientesPorEstado(estado) {
        setEstadoFiltro(estado);
    }

    const clientesFiltrados = clientes
        .filter(cliente => {
            return estadoFiltro === null || cliente.user_estado === estadoFiltro;
        })
        .filter(cliente => {
            const term = searchTerm.toLowerCase();
            const nombreCompleto = `${cliente.user_nom} ${cliente.user_apels}`.toLowerCase();
            return (
                nombreCompleto.includes(term) ||
                cliente.user_email.toLowerCase().includes(term)
            );
        });

    // Función para eliminar cliente
    const eliminarCliente = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estás seguro de eliminar este cliente?',
                text: "El usuario sera inactivado",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            });

            if (!confirm.isConfirmed) {
                return;
            }

            const res = await axios.put(`${BACKEND_URL}/api/personas/clientes/eliminar/${id}`);

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message
                });
                setIsDataUpdated(true);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire('Error', error.response.data, 'error');
            }
        }
    };

    // Función para restaurar cliente
    const restaurarCliente = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estás seguro de que desea restaurar este cliente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, restaurar'
            });

            if (!confirm.isConfirmed) {
                return;
            }

            const res = await axios.put(`${BACKEND_URL}/api/personas/clientes/restaurar/${id}`);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message
                });
                setIsDataUpdated(true);
            }
        } catch (error) {
            console.error('Error al restaurar cliente:', error);
        }
    };

    // Manejo del input de búsqueda
    const handleSearch = (e) => {
        setSearchTerms(e.target.value);
    }

    return (
        <div className="">
            <div className="row">
                <h1 className="col-12 col-sm-6">Clientes</h1>
                <div className="col-12 col-sm-6 position-relative">
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control form-control-lg ps-5 w-100"
                                    placeholder="Buscar usuario..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <i className={`bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary`}></i>
                            </div>
                        </div>
                        <div className="col">
                            {/* Dropdown para filtrar por estado */}
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Estado
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button className='btn w-100' onClick={() => filtrarClientesPorEstado(1)}>Activos</button>
                                    </li>
                                    <li>
                                        <button className='btn w-100' onClick={() => filtrarClientesPorEstado(0)}>Inactivos</button>
                                    </li>
                                    <li>
                                        <button className='btn w-100' onClick={() => filtrarClientesPorEstado(null)}>Todos</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Correo</th>
                            <th>Estado</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map(cliente => (
                            <tr key={cliente.id_user}>
                                <th scope="row">{cliente.id_user}</th>
                                <td>{cliente.user_nom}</td>
                                <td>{cliente.user_apels}</td>
                                <td>{cliente.user_email}</td>
                                <td className={cliente.user_estado === 1 ? 'text-success' : 'text-danger'}>
                                    {cliente.user_estado === 1 ? 'Activo' : 'Inactivo'}
                                </td>
                                <td>
                                    {cliente.user_estado === 1
                                        ? <button type="button" className="btn btn-danger" onClick={() => eliminarCliente(cliente.id_user)} ><i className="bi bi-trash"></i></button>
                                        : <button type="button" className="btn btn-success" onClick={() => restaurarCliente(cliente.id_user)} ><i className="bi bi-arrow-counterclockwise"></i></button>}
                                </td>
                            </tr>
                        ))}
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
    )
}
