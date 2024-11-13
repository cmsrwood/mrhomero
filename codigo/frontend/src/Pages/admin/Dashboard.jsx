import React, { useState, useEffect } from 'react'
import CustomChart from '../../components/CustomChart';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Dashboard() {

  const [ventas, setVentas] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const anoActual = moment().format('YYYY');
  const mesActual = moment().format('M');
  const [ano, setAno] = useState(anoActual);
  const [mes, setMes] = useState(mesActual);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, productosMasVendidosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/ventas/mostrar`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarProductosMasVendidos/${ano}/${mes}`),
        ]);
        setVentas(ventasRes.data);
        setProductosMasVendidos(productosMasVendidosRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };

    fetchData();
  }, [isDataUpdated]);

  const handleAnoChange = (event) => {
    setAno(event.target.value);
    setIsDataUpdated(true);
  };

  const handleMesChange = (event) => {
    setMes(event.target.value);
    setIsDataUpdated(true);
  };

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [65, 59, 80, 81, 56, 55]
      },
      {
        label: 'Gastos',
        data: [28, 48, 40, 19, 86, 27]
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div className="">
      <div className="row g-4">
        <div className="text-center justify-content-center">
          <CustomChart data={data} tipo='line' options={options} />
        </div>
        <div className="col-12 col-sm border border-2 mx-0 mx-sm-5 border-secondary text-center">
          <h3 className='pt-4'>Productos vendidos</h3>
          <h4 className='pt-2'>1234 unidades</h4>
          <h4 className='pb-4 text-success'>+8% este mes</h4>
        </div>
        <div className="col-12 col-sm border mx-0 mx-sm-5 border-2 border-secondary text-center">
          <h3 className='pt-4'>Total ganancias</h3>
          <h4 className='pt-2'>COP 10.000.000</h4>
          <h4 className='pb-4 text-danger'>-5% este mes</h4>
        </div>
      </div>
      <div className="container border border-2 border-secondary my-5 p-3">
        <div className="row w-100 justify-content-between mb-3">
          <h4 className="col-12 col-sm-9">Productos más vendidos</h4>
          <select value={ano} onChange={handleAnoChange} name="" id="" className="form-select col-12 col-sm mx-2">
            <option value={anoActual}>{anoActual}</option>
            <option value={anoActual - 1}>{anoActual - 1}</option>
            <option value={anoActual - 1}>{anoActual - 2}</option>
            <option value={anoActual - 1}>{anoActual - 3}</option>
            <option value={anoActual - 1}>{anoActual - 4}</option>
          </select>
          <select value={mes} onChange={handleMesChange} name="" id="" className="form-select col-12 col-sm mx-2">
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div className="row px-2">
          {
            productosMasVendidos.length == 0 ? <div className='py-3'><h2 className='text-center py-5 my-5'>No hay productos vendidos en este mes</h2></div> :
              productosMasVendidos.map((producto) => (
                <div key={producto.pro_foto} className="col-6 col-sm-3 wow animate__animated animate__flip animate__slow">
                  <div className="card">
                    <img src={`/images/menu/productos/${producto.pro_foto}`} className="card-img-top" alt="..." height={165} />
                    <div className="card-body">
                      <h5 className="card-title">{producto.pro_nom}</h5>
                      <p className="card-text">Vendido {producto.cantidad_vendida} veces</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

