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
    const[proveedor, setProveedor] = useState({
        prov_nombre: '',
        prov_direccion: '',
        prov_contacto_nombre: '',
        prov_contacto_telefono: '',
        prov_contacto_email: ''
    },[isDataUpdated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/proveedores/crearProveedores`, proveedor);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProveedor(prev => ({ ...prev, [name]: value }));
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
                                    <input type="text" className="form-control" id="recipient-name" name="prov_nombre" onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Dirección:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="prov_direccion" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Contacto:</label>
                                    <input type="text" className="form-control" id="recipient-name"  name="prov_contacto_nombre" onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Telefono:</label>
                                    <input type="text" className="form-control" id="recipient-name"   name="prov_contacto_telefono"  onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                    <input type="text" className="form-control" id="recipient-name"  name="prov_contacto_email"  onChange={handleChange} />
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
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
                )
}
