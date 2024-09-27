import React, { useEffect, useState } from 'react'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'
import Swal from 'sweetalert2'
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";
export default function Proveedores() {

    const [proveedores, setProveedores] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${BACKEND_URL}/proveedores/mostrarProveedores`);
                setProveedores(res.data);
            };
            fetchData();
        } catch (error) {
            console.error(error);
        }
        setIsDataUpdated(false);
    })
    // Para crear el proveedor
    const [proveedor, setProveedor] = useState({
        prov_nombre: '',
        prov_direccion: '',
        prov_contacto_nombre: '',
        prov_contacto_telefono: '',
        prov_contacto_email: ''
    });
    //Para editar el proveedor
    const [proveedorEdit, setProveedorEdit] = useState({
        prov_id: '',
        prov_nombre_edit: '',
        prov_direccion_edit: '',
        prov_contacto_nombre_edit: '',
        prov_contacto_telefono_edit: '',
        prov_contacto_email_edit: ''
    });

    //handleSubmit para crear el proveedor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/proveedores/crearProveedor`, proveedor);
            Swal.fire({
                icon: 'success',
                title: 'Proveedor creado exitosamente',

            });

            if (res.status === 200) {
                setIsDataUpdated(true);

                // Resetear el formulario a valores vacios
                setProveedor({
                    prov_nombre: '',
                    prov_direccion: '',
                    prov_contacto_nombre: '',
                    prov_contacto_telefono: '',
                    prov_contacto_email: '',
                });

                // Cerrar el modal
                const modalElement = document.getElementById('ModalAñadirProv');
                let modalInstance = bootstrap.Modal.getInstance(modalElement);

                // Cerrar el modal
                modalInstance.hide();
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.response && error.response.data),
            });
        }
    }
    // hanleChange para crear el proveedor
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProveedor(prev => ({ ...prev, [name]: value }));
    }

    // handleEdit para editar el proveedor
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setProveedorEdit(prev => ({ ...prev, [name]: value }));
    }

    // handleSubmit para editar el proveedor
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${BACKEND_URL}/proveedores/actualizarProveedor/${proveedorEdit.prov_id}`, proveedorEdit);
            if (res.status === 200) {
                setIsDataUpdated(true);
                // Cerrar el modal
                const modalElement = document.getElementById('ModalEditarProv');
                let modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.response && error.response.data),
            });
        }
    }
    function OpenEditModal(proveedor) {
        setProveedorEdit(proveedor);
    }

    const borrar = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar este proveedor?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar'
            });
            if (!confirm.isConfirmed) {
                return;
            }
            const res = await axios.delete(`${BACKEND_URL}/proveedores/borrarProveedor/${id}`);
            if (res.status === 200) {
                Swal.fire('Proveedor eliminado', res.data, 'success');
                setIsDataUpdated(true);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.response && error.response.data),
            });
        }
    }

    return (
        <div className='d-flex'>
            <NavegacionAdmin />
            <div className="container content">
                <div className="d-flex justify-content-between m-3">
                    <h1>Proveedores</h1>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalAñadirProv"><i className="bi bi-plus"></i>añadir</button>
                </div>
                <div className="modal" id="ModalAñadirProv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen-sm-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Añadir Proveedor</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Empresa:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_nombre" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Dirección:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_direccion" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Contacto:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_nombre" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Telefono:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_telefono" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_email" onChange={handleChange} />_edit
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-warning" onClick={handleSubmit}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Email</th>
                            <th scope="col">Editar</th>
                            <th scope='col'>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(proveedor => (
                            <tr key={proveedor.id_proveedor}>
                                <th>{proveedor.id_proveedor}</th>
                                <th scope="row" className="text-warning">{proveedor.prov_nombre}</th>
                                <td>{proveedor.prov_direccion}</td>
                                <td>{proveedor.prov_contacto_nombre}</td>
                                <td>{proveedor.prov_contacto_telefono}</td>
                                <td>{proveedor.prov_contacto_email}</td>
                                <td><button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#ModalEditarProv" onClick={() => { OpenEditModal(proveedor) }}><i className="bi bi-pencil-square"></i></button></td>
                                <td><button className="btn btn-danger" onClick={() => { borrar(proveedor.id_proveedor) }}><i className="bi bi-trash"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal para Editar proveedor */}
                <div className="modal" id="ModalEditarProv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen-sm-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Editar Proveedor</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Empresa:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_nombre_edit" value={proveedorEdit.prov_nombre_edit} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Dirección:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_direccion_edit" value={proveedorEdit.prov_direccion_edit} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Contacto:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_nombre_edit" value={proveedorEdit.prov_contacto_nombre_edit} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Telefono:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_telefono_edit" value={proveedorEdit.prov_contacto_telefono_edit} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_contacto_email_edit" value={proveedorEdit.prov_contacto_email_edit} onChange={handleEditChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-warning" onClick={handleEditSubmit}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
