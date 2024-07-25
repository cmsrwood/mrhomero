import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../css/style.css'
import img from '/img.png'

export default function Pedidos() {
  return (
    <div className='container d-flex'>
      <h1>Pedidos</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        scrollbar={{ hide: true }}
        modules={[Scrollbar, Pagination]}
        className="mySwiper p-2 w-100 ms-5"
      >
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
      </Swiper>
    </div>
  )
}
