import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {  Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../css/style.css'
import img from '/img.png';
export default function RecompensasAdmin() {
  function rcard(){
    return(
      <div className="card text-center">
      <img src={img} height={200} className="card-img-top" alt="..." />
      <div className="card-body">
          <h5 className="card-title">Hamburguesa</h5>
          <p className="card-text">$10.000</p>
          <a href="#" className="btn btn-primary">Ver</a>
      </div>
  </div>
    )
  }
  return (
    <div className= "container p-5">
      <h1>Recompensas Admin</h1>
      <div className="d-flex justify-content-between mt-5">
        <h2>Recompensas</h2>
        <button type="button" className="btn btn-success"><i className="bi bi-plus"></i>Añadir</button>
      </div>
      <div className="mt-3">
      <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      scrollbar={{ hide: true }}
        modules={[Scrollbar]}
      >

        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
        <SwiperSlide>{rcard()}</SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}
