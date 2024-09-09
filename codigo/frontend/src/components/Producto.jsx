import React from "react";
import img from "../assets/img/img.png";
import "../styles/product.css";

export default function Producto() {
    return (
        <>
            <div class="content">
                <div class="img-product">
                    <img src={img} alt="" />
                </div>
                <div class="content-product">
                    <h1>Hamburguesa</h1>
                    <p>Categoria: Hamburguesa</p>
                    <p>descripcion</p>
                    <p>Precio: $10.000</p>
                </div>
            </div>
        </>
    )
}
