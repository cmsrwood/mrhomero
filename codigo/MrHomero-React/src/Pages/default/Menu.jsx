import React from 'react'

export default function Menu() {

    function cards(times) {
        const cards = [];
        for (let i = 0; i < times; i++) {
            cards.push(
                <div className="card col text-center">
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
            <div className="">
                <div className="row justify-content-between">
                    <span className=" col text-warning fs-4">Categoria</span>
                    <button className="col-1 btn btn-warning ">Ver todo</button>
                </div>
            </div>
            <div id="carouselExample" class="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row">
                            {cards(5)}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row">
                            {cards(5)}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row">
                            {cards(5)}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <i className="bi bi-arrow-left-circle"></i>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <i className="bi bi-arrow-right-circle"></i>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}