import React, { Suspense } from "react";
import NavegacionDefault from "../navigation/NavegacionDefault";
import { Outlet } from 'react-router-dom';
import Footer from "./Footer";
import Loader from "./Loader";


const DefaultLayout = () => {
    return (
        <div className="">
            <NavegacionDefault />
            <div className=''>
                <Suspense fallback={<Loader />}>
                    {<Outlet />}
                    <Footer />
                </Suspense>
            </div>
        </div>
    );
};

export default DefaultLayout;
