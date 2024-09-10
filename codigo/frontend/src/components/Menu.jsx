// eslint-disable-next-line no-unused-vars
import React from 'react'
import SwiperCarrousel from './SwiperCarrousel'

export default function Menu() {

    return (
        <div className="">
            <div className="container">
                <h1 className="text-warning text-center p-2">Menu</h1>
                <h2 className="p-2 mb-4">Categoria</h2>
                <SwiperCarrousel />
                <h1 className="text-warning text-center p-2">Menu</h1>
                <h2 className="p-2 mb-4">Categoria</h2>
                <SwiperCarrousel />
            </div>
        </div>
    )
}