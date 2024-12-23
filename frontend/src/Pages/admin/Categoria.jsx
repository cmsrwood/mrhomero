import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Categoria() {

  const location = useLocation();
  const categoriaId = location.pathname.split("/")[3];

  const [productos, setProductos] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [imagePreview, setImagePreview] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes, categoriaRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/productos/mostrarProductos/${categoriaId}`),
          axios.get(`${BACKEND_URL}/api/menu/mostrarCategoria/${categoriaId}`),
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
        const res = await axios.delete(`${BACKEND_URL}/api/productos/borrarProducto/${id}`);
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
    const formData = new FormData();
    formData.append('id_categoria', productoSubir.id_categoria);
    formData.append('nombre', productoSubir.nombre);
    formData.append('descripcion', productoSubir.descripcion);
    formData.append('precio', productoSubir.precio);
    formData.append('puntos', productoSubir.puntos);
    formData.append('imagen', productoSubir.imagen);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/productos/crearProducto`, formData);
      if (res.status === 200) {
        Swal.fire({ icon: 'success', title: res.data.title, text: res.data.message });
        setProductoSubir({
          id_categoria: categoriaId,
          nombre: '',
          descripcion: '',
          precio: '',
          puntos: '',
          imagen: null
        })
        const modalElement = document.getElementById('AñadirModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        // Cerrar el modal
        modalInstance.hide();
        setImagePreview("");
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.title, error.response.data.message, 'error');
    }
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
      const res = await axios.put(`${BACKEND_URL}/api/productos/actualizarProducto/${id}`, formData);
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

  return (
    <div className="justify-content-between">
      <div className="d-flex justify-content-between mb-5">
        <h1>{categoria?.cat_nom}</h1>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AñadirModal">
          <i className="bi bi-plus-circle"></i> Añadir producto
        </button>
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
                    <img src={imagePreview ? imagePreview : `/images/menu/productos/${editarProducto.imagen}`} className="rounded mx-auto mb-4 d-block w-50" />
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
        {productos.map((producto) => (
          <div className="col my-2" key={producto.id_producto}>
            <div className="card text-center p-2">
              <img src={`/images/menu/productos/${producto.pro_foto}`} height={200} className="card-img-top" alt="..." />
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
                {/* Botón para borrar */}
                <div className="col">
                  <button type="button" className="btn btn-danger w-100" onClick={() => borrarProducto(producto.id_producto)}><i className="bi bi-trash"></i> Eliminar</button>
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
                        <img src={imagePreview ? imagePreview : `/images/menu/productos/${editarProducto.imagen}`} className="rounded mx-auto mb-4 d-block w-50" alt="Imagen actual" />
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
