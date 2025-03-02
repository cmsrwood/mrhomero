import React, { useState, useEffect } from 'react'
import CustomChart from '../../components/CustomChart';
import axios from 'axios';
import moment from 'moment';
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../styles/style.css'
import { NumericFormat } from 'react-number-format';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Dashboard() {

  //Traer datos
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosVendidosPorMes, setProductosVendidosPorMes] = useState(0);
  const [porcentajeProductos, setPorcentajeProductos] = useState(0);
  const [productosVentas, setProductosVentas] = useState(0);
  const [porcentajeTotal, setPorcentajeTotal] = useState(0);

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const anoActual = moment().format('YYYY');
  const mesActual = moment().format('M');
  const [ano, setAno] = useState(anoActual);
  const [mes, setMes] = useState(mesActual);
  const [IA, setIA] = useState('');
  const [IAIsLoading, setIAIsLoading] = useState(true);

  const [tipoDeReporte, setTipoDeReporte] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasMensualesRes, productosMasVendidosRes, productosVendidosPorMesRes, productosVendidosMesAnteriorRes, totalProductosVentasRes, totalProductosVentasMesAnteriorRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/ventas/ventasMensuales/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/productosMasVendidos/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaProductosVendidosPorMes/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaProductosVendidosPorMes/${mes - 1 <= 0 ? ano - 1 : ano}/${mes - 1 <= 0 ? 12 : mes - 1}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaVentasMes/${ano}/${mes}`),
          axios.get(`${BACKEND_URL}/api/tienda/ventas/cuentaVentasMes/${mes - 1 <= 0 ? ano - 1 : ano}/${mes - 1 <= 0 ? 12 : mes - 1}`),
        ]);

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

    fetchData();
  }, [isDataUpdated, ano, mes]);

  const handleAnoChange = (event) => {
    setAno(event.target.value);
    setIA('');
    const collapseElement = document.getElementById('CollapseIA');
    collapseElement.classList.remove('show');
    setIsDataUpdated(true);
  };

  const handleMesChange = (event) => {
    setMes(event.target.value);
    const collapseElement = document.getElementById('CollapseIA');
    collapseElement.classList.remove('show');
    setIA('');
    setIsDataUpdated(true);
  };

  const handleReporteChange = (event) => {
    setTipoDeReporte(event.target.value);
    setIA('');
    const collapseElement = document.getElementById('CollapseIA');
    collapseElement.classList.remove('show');
  };

  const handleSubmitAnualIA = (ano) => {
    setIAIsLoading(true);
    const fetchData = async () => {
      try {
        const [IARes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/ventas/reporteIA/${ano}`),
        ]);
        setIA(IARes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIAIsLoading(false);
      }
    };
    fetchData();
  };

  const handleSubmitMensualIA = (ano) => {
    setIAIsLoading(true);
    const fetchData = async () => {
      try {
        const [IARes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/ventas/reporteIA/${ano}/${mes}`),
        ]);
        setIA(IARes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIAIsLoading(false);
      }
    };
    fetchData();
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
        <select value={ano} onChange={handleAnoChange} name="ano" id="ano" className="form-select col-12 col-sm mx-2">
          <option value={anoActual}>{anoActual}</option>
          <option value={anoActual - 1}>{anoActual - 1}</option>
          <option value={anoActual - 2}>{anoActual - 2}</option>
          <option value={anoActual - 3}>{anoActual - 3}</option>
          <option value={anoActual - 4}>{anoActual - 4}</option>
        </select>
        <select value={mes} onChange={handleMesChange} name="mes" id="mes" className="form-select col-12 col-sm mx-2">
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
        <select value={tipoDeReporte} onChange={handleReporteChange} name="" id="" className='form-select me-2'>
          <option disabled selected value="">Seleccionar tipo de reporte</option>
          <option value="anual">Anual</option>
          <option value="mensual">Mensual</option>
        </select>
        <a className={tipoDeReporte == '' ? 'btn btn-danger me-2 disabled ' : 'btn btn-danger me-2' } target="_blank" href={tipoDeReporte == 'anual' ? `${BACKEND_URL}/api/tienda/ventas/reporte/${ano}` : `${BACKEND_URL}/api/tienda/ventas/reporte/${ano}/${mes}`}><i className="bi bi-filetype-pdf"></i></a>
        <button onClick={tipoDeReporte == 'anual' && IA == '' ? () => handleSubmitAnualIA(ano) : () => handleSubmitMensualIA(ano, mes)} className={tipoDeReporte == '' || IA != '' ? 'btn btn-primary me-2 disabled' : 'btn btn-primary me-2'} data-bs-toggle="collapse" data-bs-target="#CollapseIA" aria-expanded="false" aria-controls="CollapseIA"><i className="bi bi-stars"></i></button>
      </div>
      <div className="collapse" id="CollapseIA">
        <div className="card card-body ">
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "1rem" }}>
            {IAIsLoading ? (
                <p className="text-warning alingn-self-center">
                    <Typewriter
                        options={{
                            strings: ["Generando análisis...", "Analizando ventas...", "Preparando reporte...", "Generando reporte..."],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 50,
                        }}
                    />
                </p>
            ) : (
                <p className="" >
                <Typewriter
                    options={{
                    strings: [IA],
                    autoStart: true,
                    loop: false, 
                    delay: 1, 
                    deleteSpeed: Infinity, 
                    cursor: " ", 
                    }}
                />
                </p>
            )}
        </pre>
        </div>
      </div>
      <div className="row g-5 my-3">
        <div className="col-12 px-5 text-center justify-content-center">
          <CustomChart className='' data={dataGrafica} tipo='line' options={options} />
        </div>
        <div className="col-12 col-sm border border-2 mx-0 mx-sm-5 border-secondary text-center shadow">
          <h3 className='pt-4'>Productos vendidos por mes</h3>
          {
            productosVendidosPorMes == null ?
              <div>
                <h4 className='text-warning'>{productosVendidosPorMes || 0} Unidades</h4>
                <h4 className='text-center pb-4'>No hay ventas en este mes</h4>
              </div>
              :
              <div>
                <h4>{productosVendidosPorMes || 0} Unidades</h4>
                <h4 className={`pb-4 ${porcentajeProductos < 0 ? 'text-danger' : 'text-success'}`}>{porcentajeProductos <= 0 ? porcentajeProductos : '+' + porcentajeProductos || 0}% este mes</h4>
              </div>
          }

        </div>
        <div className="col-12 col-sm border mx-0 mx-sm-5 border-2 border-secondary text-center shadow">
          <h3 className='pt-4'>Total ventas por mes</h3>
          {
            productosVentas == null ?
              <div>
                <h4 className='text-warning'>COP ${productosVentas || 0}</h4>
                <h4 className='text-center pb-4'>No hay ventas en este mes</h4>
              </div>
              :
              <div>
                <h4>COP <NumericFormat value={productosVentas || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} /></h4>
                <h4 className={`pb-4 ${porcentajeTotal < 0 ? 'text-danger' : 'text-success'}`}>{porcentajeTotal <= 0 ? porcentajeTotal : '+' + porcentajeTotal || 0}% este mes </h4>
              </div>

          }
        </div>
      </div>
      <div className="container border border-2 border-secondary my-5 p-4 shadow">
        <div className="row w-100 justify-content-between mb-3">
          <h4 className="col-12 col-sm-9">Productos más vendidos</h4>
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
                {productosMasVendidos.map((producto, index) => {
                  return (
                    index < 10 &&
                    <SwiperSlide key={producto.pro_foto}>
                      <div className="wow Right">
                        <div className="card text-center shadow">
                          <img
                            src={`${producto.pro_foto}`}
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
