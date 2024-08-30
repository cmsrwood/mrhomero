import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Categoria from '../admin/Categoria';
import img from '../../assets/img/img.png'
import NavegacionAdmin from '../../navigation/NavegacionAdmin';

export default function MenuAdmin() {
  // carta
  function card() {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4">
        <div className="card text-center">
          <img src={img} height={200} className="card-img-top border-bottom " alt="..." />
          <div className="card-body">
            <h4 className="card-title py-3">Categoria</h4>
            <div className="row">
              <div className="col">
                <Link to="/admin/categoria" className="btn btn-success w-100">Ver</Link>
              </div>
              <div className="col">
                <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#ModalEditarCategoria">
                  Editar
                </button>
                <div className="modal fade" id="ModalEditarCategoria" tabIndex="-1" aria-labelledby="ModalEditarCategoriaLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalEditarCategoriaLabel">Editar categoria</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="row p-3">
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Imagen</label>
                            <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                          </div>
                          <div className="col-12 ">
                            <label htmlFor="floatingInput">Nombre</label>
                            <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-warning" onClick={() => {
                          Swal.fire({
                            title: 'Categoria editada',
                            text: 'La categoria fue editada correctamente',
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
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Si, borrar!",
                    cancelButtonText: "Cancelar"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Categoria eliminada',
                        text: 'La categoria fue eliminada correctamente',
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
  // menu
  return (
    <div className='d-flex'>
      <NavegacionAdmin />
      <div className="container content">
        <div className="d-flex justify-content-between mb-5">
          <h1>Menú</h1>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#MenuAdminModal">
            <i className="bi bi-plus-circle"></i> Añadir categoria
          </button>
        </div>
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
                  <div className="col-12 ">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success" onClick={() => {
                  Swal.fire({
                    title: 'Categoria creada',
                    text: 'La categoria fue creada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Hecho'
                  })
                }}>Guardar</button>
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
    </div >
  )
}
