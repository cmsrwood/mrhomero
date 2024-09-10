import React from "react";
import img from "../assets/img/hamburguesa.png";
import "../styles/product.css";

export default function Producto() {

    function card() {
        return (
            <div className="col-sm-6">
                <div className="suggestion-card">
                    <img src={img} alt="" />
                    <div className="content-suggestion">
                        <h4>Hamburguesa</h4>
                        <p style={{maxHeight: "150px", overflowY: "auto" }}>descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                    <p className="price">$10.000</p>

                </div>
            </div>
        )
    }

    return (
        <>
            <div className="card-product-content">
                <div className="img-product">
                    <img src={img} alt="" />
                </div>
                <div className="content-product">
                    <h1>Hamburguesa</h1>
                    <h2>Categoria: Hamburguesa</h2>
                    <h2>Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illum dignissimos reiciendis, quae quas eligendi alias, ab consequatur amet recusandae reprehenderit! Officiis deserunt, est reiciendis porro magni enim quod dolorem.</h2>
                    <h2 className="price">$10.000</h2>
                </div>
            </div>
            <div className="suggestion">
                <h4 className="title-suggestion">Tambien te puede gustar</h4>
                <div className="row">
                    {card()}
                    {card()}
                    {card()}
                    {card()}
                </div>
            </div>
        </>
    )
}
