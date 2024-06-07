// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';

export default function Menu() {

    const swiper = useSwiper();


    function cards(times) {
        const cards = [];
        for (let i = 0; i < times; i++) {
            cards.push(
                <div className="card text-center" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            );
        }
        return cards;
    }
    return (
        <div className="container">
            <h1 className="text-warning text-center p-2">Menu</h1>
            <div>
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-120%', 0, -500],
                        },
                        next: {
                            shadow: true,
                            translate: ['120%', 0, -500],
                        },
                    }}
                    modules={[Navigation, Pagination, EffectCreative ]}
                    navigation={{ clickable: true }}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={10}
                    className="mySwiper2"
                >
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                    <SwiperSlide>{cards(1)} </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}