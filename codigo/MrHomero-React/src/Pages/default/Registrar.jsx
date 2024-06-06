// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Registrar() {
  return (
    <div className='container p-5'>
      <form action="">
        <div className='text-center'>
          <h1 className='text-warning'>Registrar</h1>
          <p>Crear una cuenta</p>
          <p>Inicia sesion con Google</p>
          <button className='btn'><i className="bi bi-google"></i></button>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="nombre"
          />
          <label htmlFor="floatingInput">Nombre</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="apellidos"
          />
          <label htmlFor="floatingInput">Apellidos</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control"id="floatingInput"placeholder="email"/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="floatingInput" placeholder="contraseña"/>
        </div>
      </form>
    </div>
  )
}
