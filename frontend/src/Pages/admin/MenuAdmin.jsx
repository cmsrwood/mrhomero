import React, { useState, useEffect, useRef } from 'react'
import img from '../../assets/img/img.png'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uniqid from 'uniqid';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function MenuAdmin() {

  const [categorias, setCategorias] = useState([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/categorias/`),
        ]);
        setCategorias(categoriasRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);

  // Agregar categoria
  const [categoria, setCategoria] = useState({
    id: '',
    categoria: '',
    foto: null
  })
  //useREf para limpiar el input de la imagen 
  const fileInputRef = useRef(null);

  //Función para resetear el input dela imagen
  const resetFoto = () => {
    fileInputRef.current.value = '';
  }

  function filtrarCategoriasPorEstado(estado) {
    setEstadoFiltro(estado);
  }

  const categoriasFiltradas = categorias
    .filter(categoria => {
      return estadoFiltro === null || categoria.cat_estado === estadoFiltro;
    });

  //Añade la imagen
  const handleFileChange = (e) => {
    setCategoria({ ...categoria, foto: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  //input de texto
  const handleInputChange = (e) => {
    setCategoria(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Función para manejar el envío de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    let nombre = categoria.categoria;
    let nombreConGuiones = nombre.replace(/\s+/g, '_')
    const id_unico = `categoria_${nombreConGuiones}_${uniqid()}`;
    try {
      // Guardar la categoría sin la imagen
      const categoriaData = {
        id: id_unico,
        categoria: categoria.categoria,
        foto: ''
      };

      const response = await axios.post(`${BACKEND_URL}/api/tienda/categorias/crear`, categoriaData);
      if (response.status === 200) {
        try {
          // Subir la imagen a Cloudinary
          const formData = new FormData();
          formData.append('foto', categoria.foto);
          formData.append('upload_preset', 'categorias');
          formData.append('public_id', id_unico);
          
          const cloudinaryResponse = await axios.post(`${BACKEND_URL}/api/imagenes/subir`, formData);
          const url = cloudinaryResponse.data.url;

          // Actualizar la categoría con la URL de la imagen
          await axios.put(`${BACKEND_URL}/api/tienda/categorias/actualizar/${id_unico}`, {
            foto: url
          });

          Swal.fire({
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          });

          // Limpiar el formulario y actualizar el estado
          setCategoria({
            categoria: '',
            foto: null
          });
          setImagePreview('');
          setIsDataUpdated(true);

          // Cerrar el modal
          const modalElement = document.getElementById('categoriaAgregarModal');
          let modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        } catch (error) {
          await axios.delete(`${BACKEND_URL}/api/tienda/categorias/eliminar/${id_unico}`);
          throw error;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message || 'Error al procesar la solicitud'
      });
    }
    resetFoto();
  };

  //Editar categoria
  const [editarCategoria, setEditarCategoria] = useState({
    categoria: '',
    foto: null
  })

  const handleFileChangeEdit = (e) => {
    setEditarCategoria({ ...editarCategoria, foto: e.target.files[0] })
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  //input de texto para editar
  const handleInputChangeEdit = (e) => {
    setEditarCategoria(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('upload_preset', 'categorias');
    formData.append('public_id', editarCategoria.id);
    if (imagePreview) {
      formData.append('foto', editarCategoria.foto);
      try {
        const cloudinaryResponse = await axios.post(`${BACKEND_URL}/api/imagenes/subir`, formData);
        const url = cloudinaryResponse.data.url;

        const categoriaData = {
          categoria: editarCategoria.categoria,
          foto: url
        }

        try {
          const response = await axios.put(`${BACKEND_URL}/api/tienda/categorias/actualizar/${id}`, categoriaData);
          if (response.status === 200) {
            Swal.fire('Éxito', 'Categoría editada correctamente', 'success');
            const modalElement = document.getElementById('categoriaEditarModal');
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
            setImagePreview('');
            setIsDataUpdated(true);
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error', error.response.data.message, 'error');
        }
      }
      catch (error) {
        console.log(error);
        Swal.fire('Error', error.response.data.message, 'error');
      }
    } else {
      try {
        const response = await axios.put(`${BACKEND_URL}/api/tienda/categorias/actualizar/${id}`, editarCategoria);
        if (response.status === 200) {
          Swal.fire('Éxito', 'Categoría editada correctamente', 'success');
          const modalElement = document.getElementById('categoriaEditarModal');
          let modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          setImagePreview('');
          setIsDataUpdated(true);
        }
      } catch (error) {
        console.log(error);
        Swal.fire('Error', error.response.data.message, 'error');
      }
    }
  }

  const eliminarCategoria = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de borrar esta categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      });
      if (!confirm.isConfirmed) {
        return;
      }
        const res = await axios.delete(`${BACKEND_URL}/api/tienda/categorias/eliminar/${id}`);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: res.data.message
          });
          setIsDataUpdated(true);
      }
    }
    catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message
      });
    }
  };

  const restaurarCategoria = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de restaurar esta categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restaurar'
      });
      if (!confirm.isConfirmed) {
        return;
      }
        const res = await axios.put(`${BACKEND_URL}/api/tienda/categorias/restaurar/${id}`);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: res.data.message
          });
          setIsDataUpdated(true);
      }
    }
    catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message
      });
    }
  };

  function openEditModal(categoria) {
    setEditarCategoria({
      id: categoria.id_categoria,
      categoria: categoria.cat_nom,
      foto: categoria.cat_foto
    });
  }
  
  const handleClear = () => {
    setIsDataUpdated(true);
    setCategoria({
      id: '',
      categoria: '',
      foto: null
    });
    setImagePreview('');
  }
  return (
    <div className=''>
      <div className="d-flex justify-content-between mb-5">
        <h1>Menú</h1>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estado
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className='btn w-100' onClick={() => filtrarCategoriasPorEstado(1)}>Activos</button>
              </li>
              <li>
                <button className='btn w-100' onClick={() => filtrarCategoriasPorEstado(0)}>Inactivos</button>
              </li>
              <li>
                <button className='btn w-100' onClick={() => filtrarCategoriasPorEstado(null)}>Todos</button>
              </li>
            </ul>
        </div>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#categoriaAgregarModal">
          <i className="bi bi-plus-circle"></i> Añadir categoria
        </button>
      </div>
      <div className="modal fade" id="categoriaAgregarModal" tabIndex="-1" aria-labelledby="MenuModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="MenuModalLabel">Agregar categoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-12">
                    <img height={200} width={200} src={imagePreview || img} className="rounded mx-auto d-block w-50 border" alt="..." />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Imagen</label>
                    <input className='form-control' onChange={handleFileChange} ref={fileInputRef} type="file" accept='image/*' autoComplete='off' id='foto' name='foto' required />
                  </div>
                  <div className="col-12 ">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' onChange={handleInputChange} value={categoria.categoria} type="text" autoComplete='off' id='categoria' name='categoria' required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleClear}>Cancelar</button>
                <button type="submit" className="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
        {categoriasFiltradas.map(cat => (
          <div className="col my-2" key={cat.id_categoria}>
            <div className="card text-center position-relative">
              <img src={`${cat.cat_foto}`} className="card-img-top border-bottom" height={200} alt="..." />
              <div className="card-body">

                <span className={cat.cat_estado === 1 ? `position-absolute top-50 start-50 translate-middle-x badge rounded-pill bg-success` : `position-absolute top-50 start-50 translate-middle-x badge rounded-pill bg-danger `}>
                {cat.cat_estado === 1 ? `Activo` : `Inactivo`}
                <span className="visually-hidden">unread messages</span>
                </span>

                <h3 className="card-title mb-3">{cat.cat_nom}</h3>
                <div className="row row-cols-3">
                  {/* Ver categoria */}
                  <div className='col'>
                    <Link to={`/admin/categoria/${cat.id_categoria}`} className="btn btn-success w-100"><i className="bi bi-eye"></i></Link>
                  </div>
                  {/* Editar categoria */}
                  <div className='col'>
                    <button className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#categoriaEditarModal" onClick={() => openEditModal(cat)}><i className="bi bi-pencil-square"></i></button>
                  </div>
                  {/* Eliminar categoria  */}
                  <div className='col'>
                    {
                      cat.cat_estado === 1 ? 
                      <button onClick={() => eliminarCategoria(cat.id_categoria)} className="btn btn-danger w-100"><i className="bi bi-trash"></i></button>
                      :
                      <button onClick={() => restaurarCategoria(cat.id_categoria)} className="btn btn-success w-100"><i className="bi bi-arrow-counterclockwise"></i></button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="modal fade" id="categoriaEditarModal" tabIndex="-1" aria-labelledby="MenuModalLabelEditar" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="MenuModalLabelEditar">Editar categoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-12 mb-3">
                    {editarCategoria.foto ? (
                      <img src={imagePreview ? imagePreview : `${editarCategoria.foto}`} className="w-50 mx-auto d-block mb-3" alt="" />)
                      : null}
                    <input className='form-control' onChange={handleFileChangeEdit} defaultValue={null} type="file" accept='image/*' autoComplete='off' id='foto' name='foto' required />
                  </div>
                  <div className="col-12 ">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' onChange={handleInputChangeEdit} value={editarCategoria.categoria} type="text" autoComplete='off' id='categoria' name='categoria' required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success" onClick={() => handleEdit(editarCategoria.id)}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}