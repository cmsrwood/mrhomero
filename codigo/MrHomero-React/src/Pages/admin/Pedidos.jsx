import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '../../css/style.css'

export default function Pedidos() {
  return (
    <div className='container p-3 border border-2 border-secondary'>
      <h1>Pedidos</h1>
      <div className='border border-2 border-secondary'>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true
        }}
        modules={{ Pagination }}
        className="mySwiper container position-absolute top-0 end-0"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}
