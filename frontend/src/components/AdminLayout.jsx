import React, { Suspense } from "react";
import NavegacionAdmin from "../navigation/NavegacionAdmin";
import { Outlet } from 'react-router-dom';
import Loader from "./Loader";


const AdminLayout = () => {
    return (
        <div className="d-flex">
            <NavegacionAdmin />
            <div className='container content'>
                <Suspense fallback={<Loader />}>
                    {<Outlet />}
                </Suspense>
            </div>
        </div>

    );
};

export default AdminLayout;
