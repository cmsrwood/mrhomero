// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Menu() {

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
            </div>
        </div>
    )
}