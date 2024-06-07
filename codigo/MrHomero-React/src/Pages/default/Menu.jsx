// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Menu() {

    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#scrollspy-example'
    })

    function cards(times) {
        const cards = [];
        for (let i = 0; i < times; i++) {
            cards.push(
                <div className="col card text-center" key={i}>
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
            <div className="row">
                <div className="col-3">
                    <div id="list-example" className="list-group">
                        <a className="list-group-item list-group-item-action" href="#list-item-1">Categoria 1</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-2">Categoria 2</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-3">Categoria 3</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-4">Categoria 4</a>
                    </div>
                </div>
                <div className="col-9 scrollable-container">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        <div id="list-item-1">
                            <h4 className='text-center'>Categoria 1</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {cards(8)}
                            </div>
                        </div>
                        <div id="list-item-2">
                            <h4 className='text-center'>Categoria 2</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {cards(8)}
                            </div>
                        </div>
                        <div id="list-item-3">
                            <h4 className='text-center'>Categoria 3</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {cards(8)}
                            </div>
                        </div>
                        <div id="list-item-4">
                            <h4 className='text-center'>Categoria 4</h4>
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {cards(8)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}