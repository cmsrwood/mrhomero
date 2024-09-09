import React from "react";
import img from "../assets/img/hamburguesa.png";
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
                    <h2>Categoria: Hamburguesa</h2>
                    <h2>descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illum dignissimos reiciendis, quae quas eligendi alias, ab consequatur amet recusandae reprehenderit! Officiis deserunt, est reiciendis porro magni enim quod dolorem.</h2>
                    <h2>Precio: $10.000</h2>
                </div>
            </div>
        </>
    )
}
