import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '../../css/style.css'
import img from '/img.png';

export default function Pedidos() {
  return (
    <div className='container d-flex'>
      <h1>Pedidos</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true
        }}
        modules={{ Pagination }}
        className="mySwiper p-2 w-100 ms-5"
      >
        <SwiperSlide><img className="card-img w-50 h-100"src={img}></img></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
      </Swiper>
    </div>
  )
}
