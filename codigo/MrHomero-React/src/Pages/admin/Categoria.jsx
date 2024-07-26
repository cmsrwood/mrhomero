import React from 'react'
import img from '/img.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Categoria() {
  function card() {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4">
        <div className="card">
          <img src={img} height={200} className="card-img-top" alt="..." />
          <div className="card-body">
            <h4 className="card-title py-3">Producto</h4>
            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#ModalEditarCategoria">
                  Editar
                </button>
                <div className="modal fade" id="ModalEditarCategoria" tabIndex="-1" aria-labelledby="ModalEditarCategoriaLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalEditarCategoriaLabel">Editar producto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="row p-3">
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Imagen</label>
                            <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Nombre</label>
                            <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Precio</label>
                            <input className='form-control' type="number" autoComplete='off' id='nom_cat' name='nom_cat' required min={0} step={50} />
                          </div>
                          <div className="col-12 mb-3">
                            <select name="" className="form-select" id="" required>
                              <option value="1" selected disabled>Categoria...</option>
                              <option value="2">Hamburguesas</option>
                              <option value="3">Perros Calientes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-warning" onClick={() => {
                          Swal.fire({
                            title: 'Producto editado',
                            text: 'El producto fue editado correctamente',
                            icon: 'success',
                            confirmButtonText: 'Hecho'
                          })
                        }}>Guardar cambios</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <button type="button" className="btn btn-danger w-100" onClick={() => {
                  Swal.fire({
                    title: "¿Estas seguro?",
                    text: "¡No puedes revertir esta accion!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Si, borrar!",
                    cancelButtonText: "Cancelar"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Producto eliminado',
                        text: 'El producto fue eliminado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Hecho'
                      });
                    }
                  });
                }}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="container my-5 d-flex justify-content-between">
        <h1>Nombre de la categoria</h1>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#MenuAdminModal">
          <i className="bi bi-plus-circle"></i> Añadir producto
        </button>
        <div className="modal fade" id="MenuAdminModal" tabIndex="-1" aria-labelledby="MenuModalLabel" aria-hidden="true">
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
                    <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Precio</label>
                    <input className='form-control' type="number" autoComplete='off' id='nom_cat' name='nom_cat' required min={0} step={50} />
                  </div>
                  <div className="col-12 mb-3">
                    <select name="" className="form-select" id="" required>
                      <option value="1" selected disabled>Categoria...</option>
                      <option value="2">Hamburguesas</option>
                      <option value="3">Perros Calientes</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success" onClick={() => {
                  Swal.fire({
                    title: 'Producto añadido',
                    text: 'El producto fue añadido correctamente',
                    icon: 'success',
                    confirmButtonText: 'Hecho'
                  })
                }}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
      </div>
    </div>
  )
}
