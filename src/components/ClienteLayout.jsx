import React, { Suspense } from "react";
import NavegacionCliente from "../navigation/NavegacionCliente";
import { Outlet } from 'react-router-dom';
import Footer from "./Footer";
import Loader from "./Loader";


const ClienteLayout = () => {
    return (
        <div className="">
            <NavegacionCliente />
            <div className=''>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                    <Footer />
                </Suspense>
            </div>
        </div>
    );
};

export default ClienteLayout;
