import React, { useEffect, useState } from 'react'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'
import Swal from 'sweetalert2'
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";
export default function Proveedores() {

    const [proveedor, setProveedores] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${BACKEND_URL}/inventario/proveedor`);
                setProveedores(res.data);
            };
            fetchData();
        } catch (error) {
            console.error(error);
        }
        setIsDataUpdated(false);
    })

    return (
        <div className='d-flex'>
            <NavegacionAdmin />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Empresa</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Encargado/a</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedor.map(proveedor => (
                            <tr key={proveedor.id}>
                                <th scope="row">{proveedor.prov_nombre}</th>
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
