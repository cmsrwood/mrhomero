import React from "react";
import NavegacionDefault from "../navigation/NavegacionDefault";
import { Outlet } from 'react-router-dom';


const DefaultLayout = () => {
    return (
        <div className="">
            <NavegacionDefault />
            <div className=''>
                {<Outlet />}
            </div>
        </div>
    );

};

export default DefaultLayout;
