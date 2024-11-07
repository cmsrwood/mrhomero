import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Ventas() {

  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, clientesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/ventas/mostrar`),
          axios.get(`${BACKEND_URL}/api/clientes/mostrar`)
        ]);
        setVentas(ventasRes.data);
        setClientes(clientesRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);

  const formatNumber = (value) => {
    // Convertir el valor a cadena y eliminar caracteres no numéricos
    const formattedValue = value.toString().replace(/\D/g, '');
    // Añadir puntos como separadores de miles
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className=''>
      {/* Cuerpo de la pagina */}
      <div className="row">
        <h1 className="col-12 col-sm-6">Gestion de ventas</h1>
        <div className="col-12 col-sm-6 position-relative">
        </div>
      </div>
      {/* Tabla  de ventas*/}
      <div className="table-responsive">
        <table className=" table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Metodo de pago</th>
              <th scope="col">Total</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <tr key={venta.id_venta}>
                  <td>{venta.venta_fecha}</td>
                  <td className={clientes.find((cliente) => cliente.id_user === venta.id_user) ? `text-success` : `text-danger`}>{clientes.find((cliente) => cliente.id_user === venta.id_user) ? `${clientes.find((cliente) => cliente.id_user === venta.id_user).user_nom} ${clientes.find((cliente) => cliente.id_user === venta.id_user).user_apels}` : 'Cliente sin cuenta'}</td>
                  <td>{venta.venta_metodo_pago}</td>
                  <td>COP {formatNumber(venta.venta_total)}</td>
                  <td><button className="btn btn-danger"><i className='bi bi-trash'></i></button></td>
                </tr>
              )
              )) : (
              <tr>
                <td colSpan="6" className='text-center'>No hay ventas</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
