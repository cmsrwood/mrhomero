import React from "react";
import NavegacionCliente from "../navigation/NavegacionCliente";
import { Outlet } from 'react-router-dom';
import Footer from "./Footer";


const ClienteLayout = () => {
    return (
        <div className="">
            <NavegacionCliente />
            <div className='container'>
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default ClienteLayout;
