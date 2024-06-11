// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';
import img from '../../../public/img.png';

export default function Menu() {

    const swiper = useSwiper();


  
    function card () {
        return (
            <div className="card text-center">
                <img src={img} height={200} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Hamburguesa</h5>
                    <p className="card-text">$10.000</p>
                    <a href="#" className="btn btn-primary">Ver</a>
                </div>
            </div>
        );
    }
        
    return (
        <div className="container">
            <h1 className="text-warning text-center p-2">Menu</h1>
            <h2 className="p-2 mb-4">Categoria</h2>
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            translate: ['-100%', 0, -500],
                        },
                        next: {
                            translate: ['100%', 0, -500],
                        },
                    }}
                    centeredSlides={true}
                    modules={[Navigation, Pagination, EffectCreative ]}
                    navigation={{ clickable: true }}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={3}
                    className="mySwiper2"
                >
                    <SwiperSlide>{card()} </SwiperSlide>
                    <SwiperSlide>{card()} </SwiperSlide>
                    <SwiperSlide>{card()} </SwiperSlide>
                    <SwiperSlide>{card()} </SwiperSlide>
                    <SwiperSlide>{card()} </SwiperSlide>
                </Swiper>
        </div>
    )
}