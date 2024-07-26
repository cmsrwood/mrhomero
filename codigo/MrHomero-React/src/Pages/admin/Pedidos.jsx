import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../css/style.css'
import img from '/img.png'

export default function Pedidos() {
  function card() {
    return (
      <div className="card text-center">
        <img src={img} height={75} className="card-img-top border-bottom border-1" alt="..." />
        <div className="card-body">
          <h5 className="card-title fs-sm-6">Categoria</h5>
        </div>
      </div>
    )
  }

  function card2() {
    return (
      <div className="card text-center">
        <img src={img} height={80} width={80} className="card-img-top border-bottom border-1" alt="..." />
        <div className="card-body">
          <h5 className="card-title fs-sm-6">Categoria</h5>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='container d-flex'>
        <h1 className="mt-3 mt-sm-5">Pedidos</h1>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          scrollbar={{ hide: true }}
          modules={[Scrollbar]}
          className="mySwiper p-2 w-100 ms-5"
        >
          <SwiperSlide>{card()}</SwiperSlide>
          <SwiperSlide>{card()}</SwiperSlide>
          <SwiperSlide>{card()}</SwiperSlide>
          <SwiperSlide>{card()}</SwiperSlide>
          <SwiperSlide>{card()}</SwiperSlide>
          <SwiperSlide>{card()}</SwiperSlide>
        </Swiper>
      </div>
      <div className='container border border-2 border-secondary p-3'>
        <div className='row'>
          <div className='col'>
            <div className='row'>
              <div className='col'>
                {card2()}
              </div>
              <div className='col'>
                {card2()}
              </div>
              <div className='col '>
                {card2()}
              </div>
            </div>
          </div>
          <div className="col">
            <h1>Pedidos</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus totam repellat ab, quibusdam quasi quam pariatur magnam earum est consequatur nobis eius laborum in quod itaque. Culpa, eaque adipisci!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
