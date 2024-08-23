// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavegacionDefault from '../../navigation/NavegacionDefault'
import img from '../../assets/img/img.png'

export default function IndexDefault() {
  const heightCarrouselImg = 200
  return (
    <div className=''>
      <NavegacionDefault />
      <div id="carouselExample" className="carousel slide mb-5 ">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img height={heightCarrouselImg} src={img} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img height={heightCarrouselImg} src={img} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img height={heightCarrouselImg} src={img} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <h1>Si lo que buscas es sabor <br /> Mr. Homero es el mejor</h1>
      </div>
    </div>
  )
}
