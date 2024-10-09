import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function IndexAdmin() {

  const [clientes, setClientes] = useState([]);
  const [clientesUltimoMes, setClientesUltimoMes] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, clientesUltimoMesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/clientes/mostrar`),
          axios.get(`${BACKEND_URL}/api/clientes/mostrarCuentaClientesUltimoMes`)
        ]);
        setClientes(clientesRes.data);
        setClientesUltimoMes(clientesUltimoMesRes.data);
        console.log(clientesUltimoMesRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);

  return (
    <div>
      <div className='text-center pb-3 pt-3'>
        <h1>Mr. Homero | Inicio</h1>
      </div>
      <div className='container border border-2 border-secondary p-3 mb-2'>
        <h3 className='m-3'>Bienvenido (usuario)</h3>
        <p className='m-3'>Estas son algunas de las funcuiones más utilizadas por tí</p>
        <div className='row aling items-center m-2'>
          <div className='col'>
            <h5>Ventas</h5>
            <Link className='d-block mx-1'>Analisis de ventas</Link>
            <Link className='d-block mx-1'>Gestion de ventas</Link>
            <Link className='d-block mx-1'>Pedidos</Link>
          </div>
          <div className='col'>
            <h5>Inventario</h5>
            <Link className='d-block mx-1'>Prueba</Link>
            <Link className='d-block mx-1'>Prueba</Link>
            <Link className='d-block mx-1'>Prueba</Link>
          </div>
          <div className='col'>
            <h5>Compras</h5>
            <Link className='d-block mx-1'>Prueba</Link>
            <Link className='d-block mx-1'>Prueba</Link>
            <Link className='d-block mx-1'>Prueba</Link>
          </div>
        </div>
      </div>
      <div className='container pt-3'>
        <div className="row  g-4">
          <div className="col-12 col-sm border border-2 border-secondary text-center">
            <h3 className='pt-4'>Visitas del aplicativo</h3>
            <p className='pt-2'>999 Visitas recientes</p>
            <h4 className='pb-4'>+ 8% este mes</h4>
          </div>
          <div className="col-12 col-sm border border-2 border-secondary text-center mx-0 mx-sm-3">
            <h3 className='pt-4'>Usuarios registrados</h3>
            <p className='pt-2'>{clientes?.length} Usuarios registrados</p>
            <h4 className='pt-2 text-success'>+{clientesUltimoMes?.length} este mes</h4>
          </div>
          <div className="col-12 col-sm border border-2 border-secondary text-center">
            <h3 className='pt-4'>Reseñas</h3>
            <h4 className='pt-2'>⭐⭐⭐⭐⭐</h4>
            <h4 className='pb-4'>Comentario de Google</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
