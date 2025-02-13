import React, { useState, useEffect } from 'react';
import CustomChart from '../../components/CustomChart';
import axios from 'axios';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../styles/style.css';
import { NumericFormat } from 'react-number-format';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Dashboard() {
  // Traer datos
  const [ventas, setVentas] = useState([]);
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosVendidosPorMes, setProductosVendidosPorMes] = useState(0);
  const [porcentajeProductos, setPorcentajeProductos] = useState(0);
  const [productosVentas, setProductosVentas] = useState(0);
  const [porcentajeTotal, setPorcentajeTotal] = useState(0);

  const [isDataUpdated, setIsDataUpdated] = useState(true); // Cambié a `true` para que se actualice la primera vez
  const anoActual = moment().format('YYYY');
  const mesActual = moment().format('M');
  const [ano, setAno] = useState(anoActual);
  const [mes, setMes] = useState(mesActual);

  const [tipoDeReporte, setTipoDeReporte] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, ventasMensualesRes, productosMasVendidosRes, productosVendidosPorMesRes, productosVendidosMesAnteriorRes, totalProductosVentasRes, totalProductosVentasMesAnteriorRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/ventas/`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/ventasMensuales/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/productosMasVendidos/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaProductosVendidosPorMes/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaProductosVendidosPorMes/${ano}/${mes - 1}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaVentasMes/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaVentasMes/${ano}/${mes - 1}`)
        ]);
        setVentas(ventasRes.data);
        setVentasMensuales(ventasMensualesRes.data);
        setProductosMasVendidos(productosMasVendidosRes.data);
        setProductosVendidosPorMes(productosVendidosPorMesRes.data[0].cantidad);
        setPorcentajeProductos(Math.floor(((productosVendidosPorMesRes.data[0].cantidad - productosVendidosMesAnteriorRes.data[0].cantidad) / productosVendidosPorMesRes.data[0].cantidad) * 100));
        setProductosVentas(totalProductosVentasRes.data[0].total);
        setPorcentajeTotal(Math.floor((totalProductosVentasRes.data[0].total - totalProductosVentasMesAnteriorRes.data[0].total) / totalProductosVentasRes.data[0].total * 100));
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };

    if (isDataUpdated) {
      fetchData();
    }
  }, [isDataUpdated, ano, mes]);

  const handleAnoChange = (event) => {
    setAno(event.target.value);
    setIsDataUpdated(true);
  };

  const handleMesChange = (event) => {
    setMes(event.target.value);
    setIsDataUpdated(true);
  };

  const handleReporteChange = (event) => {
    setTipoDeReporte(event.target.value);
  };

  const diasMes = [];
  for (let dia = 1; dia <= moment(`${ano}-${mes}-01`, "YYYY-MM").daysInMonth(); dia++) {
    diasMes.push(dia);
  }

  const ventasDiarias = diasMes.map(dia => {
    const venta = ventasMensuales.find(venta => venta.dia == dia);
    return {
      dia: dia,
      total_ventas: venta ? venta.total_ventas : 0
    };
  });

  const dataGrafica = {
    labels: ventasDiarias.map(venta => venta.dia),
    datasets: [{
      label: 'Ingresos',
      data: ventasDiarias.map(venta => venta.total_ventas),
    }]
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
      <div className='row w-100 justify-content-between my-3'>
        <select value={ano} onChange={handleAnoChange} className="form-select col-12 col-sm mx-2">
          <option value={anoActual}>{anoActual}</option>
          <option value={anoActual - 1}>{anoActual - 1}</option>
          <option value={anoActual - 2}>{anoActual - 2}</option>
          <option value={anoActual - 3}>{anoActual - 3}</option>
          <option value={anoActual - 4}>{anoActual - 4}</option>
        </select>
        <select value={mes} onChange={handleMesChange} className="form-select col-12 col-sm mx-2">
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
      <div className="d-flex w-100 justify-content-between my-3">
        <select value={tipoDeReporte} onChange={handleReporteChange} className='form-select me-2'>
          <option disabled selected value="">Seleccionar tipo de reporte</option>
          <option value="anual">Anual</option>
          <option value="mensual">Mensual</option>
        </select>
        <a className='btn btn-danger me-2' target="_blank" href={tipoDeReporte === 'anual' ? `${BACKEND_URL}/api/ventas/crearReporte/${ano}` : `${BACKEND_URL}/api/ventas/crearReporte/${ano}/${mes}`}><i className="bi bi-filetype-pdf"></i></a>
      </div>
      <div className="row g-5 my-3">
        <div className="col-12 px-5 text-center justify-content-center">
          <CustomChart className='' data={dataGrafica} tipo='line' options={options} />
        </div>
        <div className="col-12 col-sm border border-2 mx-0 mx-sm-5 border-secondary text-center shadow">
          <h3 className='pt-4'>Productos vendidos por mes</h3>
          <h4>{productosVendidosPorMes || 0} Unidades</h4>
          <h4 className={`pb-4 ${porcentajeProductos < 0 ? 'text-danger' : 'text-success'}`}>{porcentajeProductos <= 0 ? porcentajeProductos : '+' + porcentajeProductos || 0}% este mes</h4>
        </div>
        <div className="col-12 col-sm border mx-0 mx-sm-5 border-2 border-secondary text-center shadow">
          <h3 className='pt-4'>Total ventas por mes</h3>
          <h4>COP <NumericFormat value={productosVentas || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} /></h4>
          <h4 className={`pb-4 ${porcentajeTotal < 0 ? 'text-danger' : 'text-success'}`}>{porcentajeTotal <= 0 ? porcentajeTotal : '+' + porcentajeTotal || 0}% este mes </h4>
        </div>
      </div>
      <div className="container border border-2 border-secondary my-5 p-4 shadow">
        <div className="row w-100 justify-content-between mb-3">
          <h4 className="col-12 col-sm-9">Productos más vendidos</h4>
        </div>
        <div className="row px-2">
          {
            productosMasVendidos.length === 0 ?
              <div className='py-3'>
                <h2 className='text-center py-5 my-5'>No hay productos vendidos en este mes</h2>
              </div>
              :
              <Swiper
                pagination={{ clickable: true }}
                scrollbar={{ hide: true }}
                modules={[Scrollbar]}
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 40 },
                  1024: { slidesPerView: 4, spaceBetween: 25 }
                }}
                className="mySwiper"
              >
                {productosMasVendidos.map((producto, index) => {
                  return (
                    index < 10 &&
                    <SwiperSlide key={producto.pro_foto}>
                      <div className="wow animate__animated animate__fadeInRight">
                        <div className="card text-center shadow">
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
    </div>
  );
}
