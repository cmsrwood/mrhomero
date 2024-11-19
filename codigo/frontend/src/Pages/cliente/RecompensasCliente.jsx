import React from 'react'
import img from '../../assets/img/img.png'

export default function RecompensasCliente() {
  function carta(progreso) {
    if (progreso == 100) {
      return (
        <div className="col-12 border p-5 my-3">
          <div className="row align-items-center">
            <div className="col-2">
              <img src={img} className='rounded border img-fluid w-100' alt="" />
            </div>
            <div className="col-7 px-5 align-content-center">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias exercitationem quidem iusto nemo saepe numquam!</p>
              <div className="progress position-relative" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-warning" style={{ width: `${progreso}%` }}></div>
                <p className='fw-bold position-absolute top-50 end-50 translate-middle'>100/999</p>
              </div>
            </div>
            <div className="col-3">
              <button className='btn btn-warning'>Reclamar recompensa</button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="col-12 border p-5 my-3">
        <div className="row align-items-center">
          <div className="col-2">
            <img src={img} className='rounded border img-fluid w-100' alt="" />
          </div>
          <div className="col-10 px-5 align-content-center">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias exercitationem quidem iusto nemo saepe numquam!</p>
            <div className="progress position-relative" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-warning" style={{ width: `${progreso}%` }}></div>
              <p className='fw-bold position-absolute top-50 end-50 translate-middle'>100/999</p>
            </div>
          </div>
        </div>
      </div>
    )

  }
  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Recompensas</h1>
          <h2>Puntos obtenidos: 333</h2>
        </div>
        <div>
          <div className="row scrollbar">
            {carta(100)}
            {carta(30)}
            {carta(40)}
            {carta(50)}
            {carta(70)}
          </div>
        </div>
      </div>
    </div>
  )
}
