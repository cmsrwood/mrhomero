import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Pedidos() {
  // Uso de useState para los modales
  const [showModalSale, setShowModalSale] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const [inputs, setInputs] = useState({
    received: ''
  })

  const [venta, setVenta] = useState([]);
  const [activeInput, setActiveInput] = useState('received');
  const [searchTerm, setSearchTerms] = useState('');
  const [userSelect, setUserSelect] = useState({
    id_user: 0,
    user_nom: '',
    user_apels: '',
  });
  const [idCategoria, setIdCategoria] = useState(null);

  // Traer datos
  const [categorias, setCategorias] = useState([]);
  const [mostrarProductos, setMostrarProductos] = useState([]);
  const [mostrarClientes, setMostrarClientes] = useState([]);
  const [metodoPago, setMetodoPago] = useState('Efectivo');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasRes, productosRes, clientesRes,] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/menu/mostrarCategorias`),
          axios.get(`${BACKEND_URL}/api/productos/mostrarProductos/${idCategoria}`),
          axios.get(`${BACKEND_URL}/api/clientes/mostrar`),
        ]);
        setCategorias(categoriasRes.data);
        setMostrarProductos(productosRes.data);
        setMostrarClientes(clientesRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }), [isDataUpdated];

  const navigate = useNavigate();

  //Convertir el valor a cadena y eliminar caracteres no numéricos
  const formatNumber = (value) => {
    const formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Elimina puntos y convierte la cadena a número
  const parseNumber = (value) => {
    return parseFloat(value.replace(/\./g, '')) || 0;
  }

  const handleButtonClick = (number) => {
    // Agregar el número al valor actual del input
    setInputs(prevInputs => ({
      ...prevInputs,
      [activeInput]: formatNumber(prevInputs[activeInput] + number)
    }));
  };

  const handleValueClick = (number) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [activeInput]: formatNumber(
        parseNumber(formatNumber(prevInputs[activeInput])) + parseNumber(formatNumber(number))
      ),
    }));
  };

  const handleDeleteLastDigit = () => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [activeInput]: formatNumber(prevInputs[activeInput].slice(0, -1))
    }));
  };

  const handleClearInput = () => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [activeInput]: ''
    }));
  };

  // Funciones para la busqueda de usuario
  const filteredClients = mostrarClientes.filter(cliente => {
    const term = searchTerm.toLowerCase();
    return (
      cliente.user_nom.toLowerCase().includes(term) ||
      cliente.user_apels.toLowerCase().includes(term) ||
      cliente.user_email.toLowerCase().includes(term)
    )
  })

  // Funcion para la busqueda del usuario
  const handleSearch = (e) => {
    setSearchTerms(e.target.value);
  }

  // Funcion para agregar el usuario
  const handleAddClient = (cliente) => {
    setUserSelect({
      ...userSelect,
      id_user: cliente.id_user,
      user_nom: cliente.user_nom,
      user_apels: cliente.user_apels
    });
  }

  // Funcion para la venta de productos
  function ventaProductos(producto) {
    const existeProducto = venta.some(p => p.id_producto === producto.id_producto);
    if (!existeProducto) {
      const cantidad = 1;
      setVenta([...venta, { ...producto, cantidad: cantidad, total: totalPrecioProductos() }]);
    }
  }

  function actualizarCantidad(id_producto, incremento) {
    setVenta(venta.map(producto =>
      producto.id_producto === id_producto
        ? { ...producto, cantidad: Math.max(1, producto.cantidad + incremento) }
        : producto
    ))
  }

  function totalPrecioProductos() {
    return venta.reduce((total, producto) => total + (producto.pro_precio * producto.cantidad), 0);
  }

  function seleccionarCategoria(id) {
    setIdCategoria(id)
  }

  function deleteProduct(productoAEliminar) {
    const updatedItems = venta.filter(producto => producto !== productoAEliminar);
    setVenta(updatedItems);
  }

  const [ventaInfo, setVentaInfo] = useState({
    fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
    metodo_pago: '',
    id_user: 0,
    total: 0
  });

  const handleChange = () => {
    const updatedInfo = {
      fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
      metodo_pago: metodoPago,
      id_user: userSelect.id_user,
      total: totalPrecioProductos()
    };
    setVentaInfo(updatedInfo);
    return updatedInfo;
  };

  const handleSubmit = async () => {
    if (verificarRecibido() == 'correcto') {
      const updatedVentaInfo = handleChange();
      try {
        const ventaRes = await axios.post(`${BACKEND_URL}/api/ventas/crear`, updatedVentaInfo);
        if (ventaRes.status === 200) {
          const id_venta = ventaRes.data.id_venta;

          const detalles = venta.map(async (producto) => {
            const detalleVenta = {
              id_venta: id_venta,
              id_producto: producto.id_producto,
              cantidad: producto.cantidad,
              precio_unitario: producto.pro_precio,
              subtotal: producto.pro_precio * producto.cantidad
            };
            return axios.post(`${BACKEND_URL}/api/ventas/crearDetalleVenta`, detalleVenta);
          });

          await Promise.all(detalles);

          setIsDataUpdated(true);
          setShowModalSale(false);
          setShowModalConfirm(true);
        }
      }
      catch (error) {
        console.log(error);
        if (error.response) {
          Swal.fire('Error', error.response.data, 'error');
        }
      }
    }
    else if (verificarRecibido() == 'vacio') {
      Swal.fire({
        title: "Debes ingresar cantidad recibida",
        text: 'La cantidad recibida no puede ser 0',
        timer: 1200,
        icon: 'error',
        showConfirmButton: false
      })
    }
    else if (verificarRecibido() == 'menor') {
      Swal.fire({
        title: `La cantidad recibida es menor a ${totalPrecioProductos()}`,
        text: `La cantidad recibida es : ${inputs.received}`,
        timer: 1200,
        icon: 'error',
        showConfirmButton: false
      })
    }
  };

  function verificarInformacionVenta() {
    if (venta.length == []) {
      Swal.fire({
        title: "El pedido está vacio",
        text: 'Agrega al menos 1 producto',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false
      })
    }
    else {
      setShowModalSale(true)
    }
  }

  function verificarRecibido() {
    if (parseNumber(inputs.received) <= 0) {
      console.log('Cantidad recibida:', parseNumber(inputs.received))
      return 'vacio';
    }
    else if (parseNumber(inputs.received) < totalPrecioProductos()) {
      console.log('Cantidad recibida:', parseNumber(inputs.received))
      return 'menor';
    }
    else {
      return 'correcto';
    }
  }

  return (
    <div className=''>
      <div className='container d-block d-sm-flex d-md-flex'>
        <h1 className="mt-3 mt-sm-5">Pedidos</h1>
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
          className="mySwiper p-2 w-100 ms-5"
        >
          {categorias.map((cat) => {
            return (
              <SwiperSlide key={cat.id_categoria}>
                <div className="col hoverCursor" onClick={() => seleccionarCategoria(cat.id_categoria)}>
                  <div className="card text-center">
                    <img
                      src={`/images/menu/categorias/${cat.cat_foto}`}
                      height={150}
                      className="card-img-top border-bottom border-1"
                      alt={cat.cat_nom}
                    />
                    <div className="card-body">
                      <h5 className="card-title fs-sm-5">{cat.cat_nom}</h5>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className='container p-3 mt-4'>
        <div className='row'>
          <div className='col'>
            <div className="row row-cols-2 row-cols-lg-3 g-2 pt-2">
              {/* Mostrar los productos de la categoria */}
              {mostrarProductos.map((product) => {
                return (
                  <div className="hoverCursor col" onClick={() => ventaProductos(product)} key={product.id_producto}>
                    <div className="card text-center">
                      <img src={`/images/menu/productos/${product.pro_foto}`} height={120} width={80} className="card-img-top border-bottom border-1" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title fs-sm-6">{product.pro_nom}</h5>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className='d-flex justify-content-between align-items-center'>
                <h5>{userSelect.user_nom ? userSelect.user_nom + " " + userSelect.user_apels : "Cliente sin cuenta"}</h5>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddClient">
                  <i className="bi bi-plus-circle">  Añadir cliente</i>
                </button>
                {/* Modal añadir cliente*/}
                <div className="modal fade" id="modalAddClient" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir cliente</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <h4>Clientes</h4>
                          <div className="search-input position-relative d-flex">
                            <div className="input-group">
                              <input type="search"
                                className="form-control form-control-lg ps-5 w-100"
                                placeholder={"Buscar usuario..."}
                                onChange={handleSearch}
                              />
                              <i className={`bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary`}></i>
                            </div>
                          </div>
                        </div>
                        <div className='table-responsive border border-1'>
                          <table className='table table-striped table-hover'>
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Email</th>
                                <th scope="col">Añadir</th>
                              </tr>
                            </thead>
                            <tbody >
                              {filteredClients.map((cliente) => {
                                return (
                                  <tr key={cliente.id_user}>
                                    <th scope="row">{cliente.id_user}</th>
                                    <th scope="row">{cliente.user_nom}</th>
                                    <th scope="row">{cliente.user_apels}</th>
                                    <th scope="row">{cliente.user_email}</th>
                                    <th scope="row"><i className="bi bi-plus-circle btn btn-success" onClick={() => handleAddClient(cliente)}></i></th>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">¡Hecho!</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container pt-3">
                <div className="row">
                  <div className="col">
                    <div className="table-responsive table-scrollbar">
                      <table className="table table-hover border border-1">
                        <thead>
                          <tr>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Puntos</th>
                            <th scope="col">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Venta */}
                          {venta.map((product) => {
                            return (
                              <tr key={product.id_venta}>
                                <td className=''>
                                  <div className="d-flex align-items-center">
                                    <button type='button' className='btn btn-danger me-2' id='btnMinus' onClick={() => actualizarCantidad(product.id_producto, -1)}>-</button>
                                    <span>{product.cantidad}</span>
                                    <button type='button' className='btn btn-success ms-2' id='btnPlus' onClick={() => actualizarCantidad(product.id_producto, 1)}>+</button>
                                  </div>
                                </td>
                                <td>{product.pro_nom}</td>
                                <td>{formatNumber(product.pro_precio * product.cantidad)}</td>
                                <td>{product.pro_puntos * product.cantidad}</td>
                                <td><button type="button" className='btn btn-danger' onClick={() => deleteProduct(product)}><i className='bi bi-trash'></i></button></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container text-center">
                <h3 className='text-end p-3'>Total: {formatNumber(totalPrecioProductos())}</h3>
                <button type='button' className='btn btn-success w-50 ms-auto p-2' data-bs-toggle="modal" data-bs-target="#modalSale" onClick={() => verificarInformacionVenta()}><i className='bi bi-cart-check fs-5'>  Realizar venta</i></button>
                {/* Modal realizar venta */}
                {showModalSale && (
                  <div className="modal show d-block" id="modalSale" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document" onClick={e => e.stopPropagation()}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5">Pedidos</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModalSale(false)}></button>
                        </div>
                        <div className="modal-body">
                          <div className="container">
                            <h3>Pedido #999</h3>
                            <div className="row">
                              <div className="col pt-3">
                                {/*Select sobre el tipo de pago*/}
                                <h3 className='text-start pb-2 ms-3'>Método de pago</h3>
                                <select onChange={(e) => setMetodoPago(e.target.value)} className='form-select form-select-sm w-75 fs-5 ms-3' aria-label='Small'>
                                  <option selected value='Efectivo'>Efectivo</option>
                                  <option value='Tarjeta'>Tarjeta</option>
                                  <option value='Nequi'>Nequi</option>
                                  <option value='Davidplata'>Daviplata</option>
                                </select>
                                {/*Botones de Cantidad de precio*/}
                                <div className='col pt-5 pb-3 justify-content-start text-start'>
                                  <div className='pt-3 ms-3'>
                                    <button type="button" className='btn btn-success w-75 fs-4' onClick={() => handleValueClick(10000)}><i className="bi bi-currency-dollar" ></i> 10.000</button>
                                  </div>
                                  <div className='pt-3 ms-3'>
                                    <button type="button" className='btn btn-success w-75 fs-4' onClick={() => handleValueClick(20000)}><i className="bi bi-currency-dollar" ></i> 20.000</button>
                                  </div>
                                  <div className='pt-3 ms-3'>
                                    <button type="button" className='btn btn-success w-75 fs-4' onClick={() => handleValueClick(30000)}><i className="bi bi-currency-dollar" ></i> 30.000</button>
                                  </div>
                                  <div className='pt-3 ms-3'>
                                    <button type="button" className='btn btn-success w-75 fs-4' onClick={() => handleValueClick(50000)}><i className="bi bi-currency-dollar" ></i> 50.000</button>
                                  </div>
                                  <div className='pt-3 ms-3'>
                                    <button type="button" className='btn btn-success w-75 fs-4' onClick={() => handleValueClick(100000)}><i className="bi bi-currency-dollar" ></i> 100.000</button>
                                  </div>
                                </div>
                              </div>
                              <div className="col pt-3">
                                {/*Input de cantidad a pagar*/}
                                <div className="input-group mb-3">
                                  <span className="input-group-text">Cantidad a pagar:</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formatNumber(totalPrecioProductos())}
                                    placeholder="Abono"
                                    onChange={(e) => setInputs({
                                      ...inputs,
                                      payment: formatNumber(e.target.value)
                                    })} />
                                  <span className="input-group-text">$</span>
                                </div>
                                {/*Input de cantidad recibida*/}
                                <div className="input-group mb-3">
                                  <span className="input-group-text">Cantidad a recibir</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Amount"
                                    value={inputs.received}
                                    placeholder="Recibido"
                                    onFocus={() => setActiveInput('received')}
                                    onChange={(e) => setInputs({
                                      ...inputs,
                                      received: formatNumber(e.target.value)
                                    })} />
                                  <span className="input-group-text">$</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  {/* Boton de eliminar cantidad de precio */}
                                  <button className="btn btn-danger w-25" data-bs-dismiss="modal" onClick={handleClearInput}> Borrar</button>
                                  <button className="btn btn-primary w-25" data-bs-dismiss="modal" onClick={handleDeleteLastDigit}><i className="fa-solid fa-delete-left"></i></button>
                                </div>
                                {/* Botones de Cantidad de precio */}
                                <div className="row mt-2">
                                  <div className='d-flex justify-content-between align-items-center pt-3'>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(1)}>1</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4 mx-2" onClick={() => handleButtonClick(2)}>2</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(3)}>3</button>
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center pt-3'>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(4)}>4</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4 mx-2" onClick={() => handleButtonClick(5)}>5</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(6)}>6</button>
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center pt-3'>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(7)}>7</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4 mx-2" onClick={() => handleButtonClick(8)}>8</button>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4" onClick={() => handleButtonClick(9)}>9</button>
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center pt-3'>
                                    <button type="button" className="btn btn-success border-2  w-100 fs-4 " onClick={() => handleButtonClick(0)}>0</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={() => setShowModalSale(false)}>Cerrar</button>
                            <button type="button" className="btn btn-success" onClick={() => { handleSubmit(); }}>Realizar venta</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Segundo Modal el pedido se a realizado */}
                {showModalConfirm && (
                  <div className="modal show d-block" id="ModalConfirm" tabIndex="-1">
                    <div className="modal-dialog modal-xl" onClick={e => e.stopPropagation()}>
                      <div className="modal-content" >
                        <div className="modal-header">
                          <h1 className="modal-title fs-4 text-success" id="ModalConfirmLabel">Pedido realizado <i className="bi bi-bag-check text-success"></i></h1>
                          <button type="button" className="btn-close" onClick={() => setShowModalConfirm(false)}></button>
                        </div>
                        <div className="modal-body">
                          <div className="container">
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <h3 className='pb-4 pt-2'>Detalles del pedido</h3>
                                  <div className="table-responsive table-scrollbar">
                                    <table className="table table-hover border border-1">
                                      <thead>
                                        <tr>
                                          <th scope="col">Cantidad</th>
                                          <th scope="col">Producto</th>
                                          <th scope="col">Precio</th>
                                          <th scope="col">Puntos</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {venta.map((product) => {
                                          return (
                                            <tr key={product.id_venta}>
                                              <td>
                                                <span>{product.cantidad}</span>
                                              </td>
                                              <td>{product.pro_nom}</td>
                                              <td>{product.pro_precio}</td>
                                              <td>{product.pro_puntos}</td>
                                            </tr>
                                          )
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="col align-self-center">
                                  <h1 className='pb-4'>Total: $ {formatNumber(totalPrecioProductos())}</h1>
                                  <h1 className='pb-4'>Recibido: $ {formatNumber(inputs.received)}</h1>
                                  <h1 className=''>Cambio: $ {formatNumber(parseNumber(inputs.received) - totalPrecioProductos())}</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                          <button type="button" className="btn btn-success fs-5" onClick={() => { navigate(0) }}><i className="bi bi-plus">Realizar otro pedido</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}