import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import NavegacionAdmin from '../../navigation/NavegacionAdmin';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Categoria() {

  const location = useLocation();
  const categoriaId = location.pathname.split("/")[3];

  const [productos, setProductos] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRes = await axios.get(`${BACKEND_URL}/productos/mostrarProductos/${categoriaId}`);
        setProductos(productosRes.data);
        setIsDataUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isDataUpdated, categoriaId]);



  const borrarProducto = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro de borrar este producto?',
        text: "No podrás revertir esta operación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      });
      if (confirm.isConfirmed) {
        const res = await axios.delete(`${BACKEND_URL}/productos/borrarProducto/${id}`);
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_categoria', productoSubir.id_categoria);
    formData.append('nombre', productoSubir.nombre);
    formData.append('descripcion', productoSubir.descripcion);
    formData.append('precio', productoSubir.precio);
    formData.append('puntos', productoSubir.puntos);
    formData.append('imagen', productoSubir.imagen);

    try {
      const res = await axios.post(`${BACKEND_URL}/productos/crearProducto`, formData);
      if (res.status === 200) {
        Swal.fire('Producto creado', res.data, 'success');
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  };

  const [editarProducto, setEditarProducto] = useState({
    id_categoria_edit: categoriaId,
    nombre_edit: '',
    descripcion_edit: '',
    precio_edit: '',
    puntos_edit: '',
    imagen_edit: null
  });


  const handleChangeEdit = (e) => {
    setEditarProducto({
      ...editarProducto,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChangeEdit = (e) => {
    setEditarProducto({
      ...editarProducto,
      imagen_edit: e.target.files[0]
    })
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_categoria', editarProducto.id_categoria_edit);
    formData.append('nombre', editarProducto.nombre_edit);
    formData.append('descripcion', editarProducto.descripcion_edit);
    formData.append('precio', editarProducto.precio_edit);
    formData.append('puntos', editarProducto.puntos_edit);
    formData.append('imagen', editarProducto.imagen_edit);

    try {
      const res = await axios.put(`${BACKEND_URL}/productos/actualizarProducto/${editarProducto.id}`, formData);
      if (res.status === 200) {
        Swal.fire('Producto editado', res.data, 'success');
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  }

  function openEditModal(producto) {
    setEditarProducto({
      id_categoria_edit: producto.id_categoria,
      nombre_edit: producto.pro_nom,
      descripcion_edit: producto.pro_desp,
      precio_edit: producto.pro_precio,
      puntos_edit: producto.pro_puntos,
      imagen_edit: null
    });
  }


  return (
    <div className="d-flex">
      <NavegacionAdmin />

      <div className="container content justify-content-between">
        <div className="d-flex justify-content-between mb-5">
          <h1>Nombre de la categoria</h1>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AñadirModal">
            <i className="bi bi-plus-circle"></i> Añadir producto
          </button>
        </div>
        {/* Modal para añadir categoria */}
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
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Imagen</label>
                      <input onChange={handleFileChange} className='form-control' type="file" accept='image/*' id='imagen' name='imagen' required />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Nombre</label>
                      <input onChange={handleChange} className='form-control' type="text" autoComplete='off' id='nombre' name='nombre' required />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Descripción</label>
                      <input onChange={handleChange} className='form-control' type="text" autoComplete='off' id='descripcion' name='descripcion' required />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Precio</label>
                      <input onChange={handleChange} className='form-control' type="number" autoComplete='off' id='precio' name='precio' required min={0} step={50} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Puntos</label>
                      <input onChange={handleChange} className='form-control' type="number" autoComplete='off' id='puntos' name='puntos' required min={0} step={1} />
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
          {productos.map((producto) => (
            <div className="col my-2" key={producto.id_producto}>
              <div className="card text-center p-2">
                <img src={`/images/menu/productos/${producto.pro_foto}`} height={200} className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className=" justify-content-between align-productos-center">
                    <h3 className="card-title">{producto.pro_nom}</h3>
                    <div className="row">
                      <div className="col">
                        <NumericFormat value={producto.pro_precio} displayType={'text'} thousandSeparator=',' prefix={'$ '} />
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
                  {/* Botón para borrar */}
                  <div className="col">
                    <button type="button" className="btn btn-danger w-100" onClick={() => borrarProducto(producto.id_producto)}><i className="bi bi-trash"></i> Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="modal fade" id="EditarModal" tabIndex="-1" aria-labelledby="MenuModalLabelEditar" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="MenuModalLabelEditar">Editar categoria</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={handleSubmitEdit}>
                  <div className="modal-body">
                    <div className="row p-3">
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Imagen</label>
                        <input onChange={handleFileChangeEdit} className='form-control' type="file" accept='image/*' id='imagen_edit' name='imagen_edit' required />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Nombre</label>
                        <input onChange={handleChangeEdit} value={editarProducto.nombre_edit} className='form-control' type="text" autoComplete='off' id='nombre_edit' name='nombre_edit' required />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Descripción</label>
                        <input onChange={handleChangeEdit} value={editarProducto.descripcion_edit} className='form-control' type="text" autoComplete='off' id='descripcion_edit' name='descripcion_edit' required />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Precio</label>
                        <input onChange={handleChangeEdit} value={editarProducto.precio_edit} className='form-control' type="number" autoComplete='off' id='precio_edit' name='precio_edit' required min={0} step={50} />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Puntos</label>
                        <input onChange={handleChangeEdit} value={editarProducto.puntos_edit} className='form-control' type="number" autoComplete='off' id='puntos_edit' name='puntos_edit' required min={0} step={1} />
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
        </div>
      </div >
    </div >
  )
}
