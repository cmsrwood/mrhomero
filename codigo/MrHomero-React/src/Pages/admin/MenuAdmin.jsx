import React from 'react'
import img from '/img.png';

export default function MenuAdmin() {
  function card() {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4">
        <div className="card text-center">
          <img src={img} height={200} className="card-img-top" alt="..." />
          <div className="card-body">
            <h4 className="card-title py-3">Categoria</h4>
            <div className="row">
              <div className="col">
                <a href="#" className="btn btn-success w-100">Ver</a>
              </div>
              <div className="col">
                <a href="#" className="btn btn-warning w-100">Editar</a>
              </div>
              <div className="col">
                <a href="#" className="btn btn-danger w-100">Eliminar</a>
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
        <h1>Menú</h1>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#MenuAdminModal">
          <i className="bi bi-plus-circle"></i> Añadir categoria
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
                  <div className="col-12 ">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success">Guardar</button>
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
