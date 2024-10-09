import React from "react";
import NavegacionAdmin from "../navigation/NavegacionAdmin";
import {Outlet } from 'react-router-dom';


const AdminLayout = () => {
    return (
        <div className="d-flex">
            <NavegacionAdmin />
            <div className='container content'>
                {<Outlet />}
            </div>
        </div>
    );

};

export default AdminLayout;
