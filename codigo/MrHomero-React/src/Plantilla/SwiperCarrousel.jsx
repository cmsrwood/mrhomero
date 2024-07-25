import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';
import img from '/img.png';

export default function SwiperCarrousel() {
    const swiper = useSwiper();
    function card() {
        return (
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
            modules={[Navigation, Pagination, EffectCreative]}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 3
                }
            }}
            className="mySwiper2"
        >
            <SwiperSlide>{card()} </SwiperSlide>
            <SwiperSlide>{card()} </SwiperSlide>
            <SwiperSlide>{card()} </SwiperSlide>
            <SwiperSlide>{card()} </SwiperSlide>
            <SwiperSlide>{card()} </SwiperSlide>
        </Swiper>
    )
}
