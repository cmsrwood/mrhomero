import React from "react";
import NavegacionDefault from "../navigation/NavegacionDefault";
import { Outlet } from 'react-router-dom';
import Footer from "./Footer";


const DefaultLayout = () => {
    return (
        <div className="">
            <NavegacionDefault />
            <div className=''>
                {<Outlet />}
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
