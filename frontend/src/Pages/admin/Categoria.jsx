import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import axios from 'axios';
import uniqid from 'uniqid';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Categoria() {

  const location = useLocation();
  const categoriaId = location.pathname.split("/")[3];

  const [productos, setProductos] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes, categoriaRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/productos/categoria/${categoriaId}`),
          axios.get(`${BACKEND_URL}/api/tienda/categorias/${categoriaId}`),
        ]);
        setProductos(productosRes.data);
        setCategoria(categoriaRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, categoriaId]);

  // Función para restaurar un producto
  const restaurarProducto = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro de que desea restaurar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restaurar'
      });

      if (!confirm.isConfirmed) {
        return;
      }

      const res = await axios.put(`${BACKEND_URL}/api/tienda/productos/restaurar/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data.message
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.error('Error al restaurar producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al restaurar producto',
        text: error.response.data.message
      });
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro de eliminar este producto?',
        text: "No podrás revertir esta operación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      });
      if (confirm.isConfirmed) {
        const res = await axios.put(`${BACKEND_URL}/api/tienda/productos/eliminar/${id}`);
        if (res.status === 200) {
          Swal.fire('Producto eliminado', res.data, 'success');
          setIsDataUpdated(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [productoSubir, setProductoSubir] = useState({
    id_categoria: categoriaId,
    nombre: '',
    descripcion: '',
    precio: '',
    puntos: '',
    imagen: null
  });

  const handleChange = (e) => {
    setProductoSubir({
      ...productoSubir,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setProductoSubir({
      ...productoSubir,
      imagen: e.target.files[0]
    })
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_unico = `producto_${productoSubir.nombre}_${uniqid()}`;

    try {
      const productoData = {
        id: id_unico,
        nombre: productoSubir.nombre,
        descripcion: productoSubir.descripcion,
        precio: productoSubir.precio,
        puntos: productoSubir.puntos,
        id_categoria: productoSubir.id_categoria,
        foto: ''
      };

      const res = await axios.post(`${BACKEND_URL}/api/tienda/productos/crear`, productoData);

      if (res.status === 200) {
        const formData = new FormData();
        formData.append('foto', productoSubir.imagen);
        formData.append('upload_preset', 'productos');
        formData.append('public_id', id_unico);

        const cloudinaryResponse = await axios.post(`${BACKEND_URL}/api/imagenes/subir`, formData);
        const url = cloudinaryResponse.data.url;

        // Actualizar el producto en la base de datos con la URL de la imagen
        await axios.put(`${BACKEND_URL}/api/tienda/productos/actualizar/${id_unico}`, {
          foto: url
        });

        Swal.fire({
          icon: 'success',
          title: res.data.title,
          text: res.data.message
        });

        // Limpiar el formulario y actualizar el estado
        setProductoSubir({
          nombre: '',
          descripcion: '',
          precio: '',
          puntos: '',
          imagen: null
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.message
      });
    }

    // Cerrar el modal
    const modalElement = document.getElementById('AñadirModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    resetFoto();
  };

  //useREf para limpiar el input de la imagen 
  const fileInputRef = useRef(null);

  //Función para resetear el input dela imagen
  const resetFoto = () => {
    fileInputRef.current.value = '';
  }

  const [editarProducto, setEditarProducto] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    puntos: '',
    imagen: null
  });


  const handleChangeEdit = (e) => {
    setEditarProducto(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChangeEdit = (e) => {
    setEditarProducto({ ...editarProducto, imagen: e.target.files[0] })
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmitEdit = async (id) => {
    const formData = new FormData();
    formData.append('nombre', editarProducto.nombre);
    formData.append('descripcion', editarProducto.descripcion);
    formData.append('precio', editarProducto.precio);
    formData.append('puntos', editarProducto.puntos);

    if (editarProducto.imagen) {
      formData.append('imagen', editarProducto.imagen);
    }

    try {
      const res = await axios.put(`${BACKEND_URL}/api/tienda/productos/actualizar/${id}`, formData);
      if (res.status === 200) {
        Swal.fire('Producto editado', res.data, 'success');
        const modalElement = document.getElementById('EditarModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        setImagePreview("");
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  }


  function openEditModal(producto) {
    setEditarProducto({
      id: producto.id_producto,
      nombre: producto.pro_nom,
      descripcion: producto.pro_desp,
      precio: producto.pro_precio,
      puntos: producto.pro_puntos,
      imagen: producto.pro_foto
    });
  }

  function filtrarProductosPorEstado(estado) {
    setEstadoFiltro(estado);
  }

  const productosFiltrados = productos
    .filter(producto => {
      return estadoFiltro === null || producto.pro_estado === estadoFiltro;
    });

  return (
    <div className="justify-content-between">
      <div className="d-flex justify-content-between mb-5">
        <h1>{categoria?.cat_nom}</h1>

        <div className="d-flex align-items-center">
          <div className="col me-5">
            {/* Dropdown para filtrar por estado */}
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estado
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className='btn w-100' onClick={() => filtrarProductosPorEstado(1)}>Activos</button>
                </li>
                <li>
                  <button className='btn w-100' onClick={() => filtrarProductosPorEstado(0)}>Inactivos</button>
                </li>
                <li>
                  <button className='btn w-100' onClick={() => filtrarProductosPorEstado(null)}>Todos</button>
                </li>
              </ul>
            </div>
          </div>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AñadirModal">
            <i className="bi bi-plus-circle"></i> Añadir producto
          </button>
        </div>

      </div>
      {/* Modal para añadir */}
      <div className="modal fade" id="AñadirModal" tabIndex="-1" aria-labelledby="MenuModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="MenuModalLabel">Agregar producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-12">
                    <img src={imagePreview ? imagePreview : `${editarProducto.imagen}`} className="rounded mx-auto mb-4 d-block w-50" />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Imagen</label>
                    <input ref={fileInputRef} onChange={handleFileChange} className='form-control' type="file" accept='image/*' id='imagen' name='imagen' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input pattern="^[A-Za-zÁ-ÿÑñ\s]+$" value={productoSubir.nombre} onChange={handleChange} className='form-control' type="text" autoComplete='off' id='nombre' name='nombre' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Descripción</label>
                    <input value={productoSubir.descripcion} onChange={handleChange} className='form-control' type="text" autoComplete='off' id='descripcion' name='descripcion' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Precio</label>
                    <input value={productoSubir.precio} onChange={handleChange} className='form-control' type="number" autoComplete='off' id='precio' name='precio' required min={0} step={50} />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Puntos</label>
                    <input value={productoSubir.puntos} onChange={handleChange} className='form-control' type="number" autoComplete='off' id='puntos' name='puntos' required min={0} step={1} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {productosFiltrados.map((producto) => (
          <div className="col my-2" key={producto.id_producto}>
            <div className="card text-center p-2">
              <span className={producto.pro_estado === 1 ? `position-absolute top-50 start-50 translate-middle-x badge rounded-pill bg-success` : `position-absolute top-50 start-50 translate-middle-x badge rounded-pill bg-danger`}>
                {producto.pro_estado === 1 ? `Activo` : `Inactivo`}
                <span className="visually-hidden">unread messages</span>
              </span>
              <img src={`${producto.pro_foto}`} height={200} className="card-img-top position-relative" alt="..." />
              <div className="card-body">
                <div className=" justify-content-between align-productos-center">
                  <h3 className="card-title">{producto.pro_nom}</h3>
                  <div className="row">
                    <div className="col">
                      <NumericFormat value={producto.pro_precio} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'$ '} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-cols-3">
                {/* Botón para ver */}
                <div className="col">
                  <Link to={`/admin/producto/${producto.id_producto}`} className="btn btn-success w-100"><i className="bi bi-eye"></i> Ver</Link>
                </div>
                {/* Botón para editar */}
                <div className="col">
                  <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#EditarModal" onClick={() => openEditModal(producto)}><i className="bi bi-pencil-square"></i> Editar</button>
                </div>
                {/* Botón para eliminar/restaurar */}
                <div className="col">
                  <button className={producto.pro_estado === 1 ? `btn btn-danger w-100` : `btn btn-success w-100`} onClick={producto.pro_estado === 1 ? () => eliminarProducto(producto.id_producto) : () => restaurarProducto(producto.id_producto)}><i className={producto.pro_estado === 1 ? `bi bi-trash` : `bi bi-arrow-counterclockwise`}></i> {producto.pro_estado === 1 ? `Eliminar` : `Restaurar`}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Modal para editar */}
        <div className="modal fade" id="EditarModal" tabIndex="-1" aria-labelledby="MenuModalLabelEditar" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="MenuModalLabelEditar">Editar producto</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="row p-3">
                    <div className="col-12 mb-3">
                      {editarProducto.imagen ? (
                        <img src={imagePreview ? imagePreview : `${editarProducto.imagen}`} className="rounded mx-auto mb-4 d-block w-50" alt="Imagen actual" />
                      ) : null}
                      <input onChange={handleFileChangeEdit} className='form-control' type="file" accept='image/*' id='imagen' name='imagen' />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Nombre</label>
                      <input pattern="^[A-Za-zÁ-ÿÑñ\s]+$" onChange={handleChangeEdit} value={editarProducto.nombre} className='form-control' type="text" autoComplete='off' id='nombre' name='nombre' required />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Descripción</label>
                      <input onChange={handleChangeEdit} value={editarProducto.descripcion} className='form-control' type="text" autoComplete='off' id='descripcion' name='descripcion' required />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Precio</label>
                      <input onChange={handleChangeEdit} value={editarProducto.precio} className='form-control' type="number" autoComplete='off' id='precio' name='precio' required min={0} step={50} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Puntos</label>
                      <input onChange={handleChangeEdit} value={editarProducto.puntos} className='form-control' type="number" autoComplete='off' id='puntos' name='puntos' required min={0} step={1} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-success" onClick={() => handleSubmitEdit(editarProducto.id)}>Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
