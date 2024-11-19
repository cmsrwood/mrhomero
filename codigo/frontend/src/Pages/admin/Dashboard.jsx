import React, { useState, useEffect } from 'react'
import CustomChart from '../../components/CustomChart';
import axios from 'axios';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../styles/style.css'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Dashboard() {

  //Traer datos
  const [ventas, setVentas] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosVendidosPorMes, setProductosVendidosPorMes] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const anoActual = moment().format('YYYY');
  const mesActual = moment().format('M');
  const [ano, setAno] = useState(anoActual);
  const [mes, setMes] = useState(mesActual);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, productosMasVendidosRes, productosVendidosPorMesRes, productosVendidosMesAnteriorRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/ventas/mostrar`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarProductosMasVendidos/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarCuentaProductosVendidosPorMes/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/ventas/mostrarCuentaProductosVendidosPorMes/${ano}/${mes - 1}`),
        ]);
        setVentas(ventasRes.data);
        setProductosMasVendidos(productosMasVendidosRes.data);
        setProductosVendidosPorMes(productosVendidosPorMesRes.data[0].cantidad);
        setPorcentaje(Math.floor(((productosVendidosPorMesRes.data[0].cantidad - productosVendidosMesAnteriorRes.data[0].cantidad) / productosVendidosPorMesRes.data[0].cantidad) * 100));

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
          <h4 className>{productosVendidosPorMes} Unidades</h4>
          <h4 className='pb-4 text-success'>{porcentaje || 0}% este mes</h4>
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
            productosMasVendidos.length == 0 ?
              <div className='py-3'>
                <h2 className='text-center py-5 my-5'>No hay productos vendidos en este mes</h2>
              </div>

              :

              <Swiper
                pagination={{
                  clickable: true,
                }}
                scrollbar={{ hide: true }}
                modules={[Scrollbar]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                  },
                }}
                className="mySwiper"
              >
                {productosMasVendidos.map((producto) => {
                  return (
                    <SwiperSlide key={producto.pro_foto}>
                      <div className="wow animate__animated animate__fadeInRight">
                        <div className="card text-center">
                          <img
                            src={`/images/menu/productos/${producto.pro_foto}`}
                            height={200}
                            className="card-img-top border-bottom border-1"
                            alt={producto.pro_foto}
                          />
                          <div className="card-body">
                            <h5 className="card-title fs-sm-5">{producto.pro_nom}</h5>
                            <p>Vendido {producto.cantidad_vendida} veces</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
          }
        </div>
      </div>
    </div >
  )
}

