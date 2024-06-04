import React from 'react'
import logo from './img/img.png';

export default function IndexDefault() {
  return (
    <div className=''>
      <div id="carouselExample" class="carousel slide ">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={logo} class="d-block w-100 h-50" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={logo} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={logo} class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <h1>Si lo que buscas es sabor <br /> Mr. Homero es el mejor</h1>
      </div>
    </div>
  )
}
