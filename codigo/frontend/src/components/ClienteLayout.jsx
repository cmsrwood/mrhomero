import React from "react";
import NavegacionCliente from "../navigation/NavegacionCliente";
import { Outlet } from 'react-router-dom';


const ClienteLayout = () => {
    return (
        <div className="">
            <NavegacionCliente />
            <div className='container'>
                {<Outlet />}
            </div>
        </div>
    );

};

export default ClienteLayout;
