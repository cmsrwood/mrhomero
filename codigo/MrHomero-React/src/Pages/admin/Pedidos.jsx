import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../css/style.css'
import img from '/img.png'
import Buscador from '../../Plantilla/Buscador'

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

  function tr() {
    return (
      <tr>
        <th scope="row">1</th>
        <th scope="row">Bryam</th>
        <th scope="row">Castañeda Cuervo</th>
        <th scope="row">1016598745</th>
        <th scope="row">bryamccuervo2004@gmail.com</th>
        <th scope="row"><i className="bi bi-plus-circle btn btn-success"></i></th>
      </tr>
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
      <div className='container d-block d-sm-flex d-md-flex'>
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
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
              <div className='col mt-2'>
                {card2()}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className='d-flex justify-content-between align-items-center'>
                <h5>Nombre del usuario</h5>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <i className="bi bi-plus-circle">  Añadir cliente</i>
                </button>
                {/* Modal[] */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir cliente</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <h4>Clientes</h4>
                          <Buscador placeholder={"Buscar Cliente"} icon="bi bi-search" />
                        </div>
                        <div className='table-responsive border border-1'>
                          <table className='table table-dark table-striped table-hover'>
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">N° de documento</th>
                                <th scope="col">Email</th>
                                <th scope="col">Añadir</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <th scope="row">Bryam</th>
                                <th scope="row">Castañeda Cuervo</th>
                                <th scope="row">1016598745</th>
                                <th scope="row">bryamccuervo2004@gmail.com</th>
                                <th scope="row"><i className="bi bi-plus-circle btn btn-success"></i></th>
                              </tr>
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                              {tr()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary">Entendido</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
