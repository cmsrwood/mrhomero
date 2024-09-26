import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NavegacionAdmin from '../../navigation/NavegacionAdmin';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function MenuAdmin() {

  const [categorias, setCategorias] = useState([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/menu/mostrarCategorias`),
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
    categoria: '',
    foto: null
  })

  //Añade la imagen
  const handleFileChange = (e) => {
    setCategoria({ ...categoria, foto: e.target.files[0] })
  }

  //input de texto
  const handleInputChange = (e) => {
    setCategoria(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Función para manejar el envío de datos
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('categoria', categoria.categoria);
    formData.append('foto', categoria.foto);

    try {
      await axios.post(`${BACKEND_URL}/menu/crearCategoria`, formData);
      Swal.fire('Éxito', 'Categoría agregada correctamente', 'success');

      setCategoria({
        categoria: '',
        foto: null
      });

      setIsDataUpdated(true); // Actualiza el estado para volver a cargar los datos
      const modalElement = document.getElementById('categoriaAgregarModal');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);

      // Cerrar el modal
      modalInstance.hide();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de borrar esta categoría?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      });
      if (!confirm.isConfirmed) {
        return;
      }
      const res = await axios.delete(`${BACKEND_URL}/menu/eliminarCategoria/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data
      });
    }
  };

  //Editar categoria
  const [editarCategoria, setEditarCategoria] = useState({
    categoria: '',
    foto: null
  })

  const handleFileChangeEdit = (e) => {
    setEditarCategoria({ ...editarCategoria, foto: e.target.files[0] })
  }

  //input de texto para editar
  const handleInputChangeEdit = (e) => {
    setEditarCategoria(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('categoria', editarCategoria.categoria);
    if (editarCategoria.foto) {
      formData.append('foto', editarCategoria.foto);
    }

    try {
      const response = await axios.put(`${BACKEND_URL}/menu/actualizarCategoria/${id}`, formData);
      if (response.status === 200) {
        Swal.fire('Éxito', 'Categoría editada correctamente', 'success');
        const modalElement = document.getElementById('categoriaEditarModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  };

  function openEditModal(categoria) {
    setEditarCategoria({
      id: categoria.id_categoria,
      categoria: categoria.cat_nom,
      foto: categoria.cat_foto
    });
  }

  return (
    <div className='d-flex'>
      <NavegacionAdmin />
      <div className="container content">
        <div className="d-flex justify-content-between mb-5">
          <h1>Menú</h1>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#categoriaAgregarModal">
            <i className="bi bi-plus-circle"></i> Añadir categoria
          </button>
        </div>
        <div className="modal fade" id="categoriaAgregarModal" tabIndex="-1" aria-labelledby="MenuModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="MenuModalLabel">Agregar categoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Imagen</label>
                    <input className='form-control' onChange={handleFileChange} defaultValue={null} type="file" accept='image/*' autoComplete='off' id='foto' name='foto' required />
                  </div>
                  <div className="col-12 ">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' onChange={handleInputChange} value={categoria.categoria} type="text" autoComplete='off' id='categoria' name='categoria' required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
          {categorias.map((cat) => {
            return (
              <div className="col" key={cat.id_categoria}>
                <div className="card">
                  <img src={`/images/menu/categorias/${cat.cat_foto}`} className="card-img-top border-bottom" height={200} alt="..." />
                  <div className="card-body text-center">
                    <h4 className="card-title">{cat.cat_nom}</h4>
                    <div className="row row-cols-3">
                      {/* Ver categoria */}
                      <div className='col'>
                        <Link to={`/admin/categoria/${cat.id_categoria}`} className="btn btn-success w-100">Ver</Link>
                      </div>
                      {/* Editar categoria */}
                      <div className='col'>
                        <button className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#categoriaEditarModal" onClick={() => openEditModal(cat)}>Editar</button>
                      </div>
                      {/* Eliminar categoria  */}
                      <div className='col'>
                        <button onClick={() => deleteCategory(cat.id_categoria)} className="btn btn-danger w-100">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          )}
          {/* Mueve este modal fuera del map() */}
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
                      {editarCategoria.foto && <img src={`/images/menu/categorias/${editarCategoria.foto}`} className="w-25" alt="" />}
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
    </div >
  )
}
