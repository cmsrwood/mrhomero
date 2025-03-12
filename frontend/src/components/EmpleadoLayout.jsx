import React, { Suspense } from "react";
import NavegacionEmpleado from "../navigation/NavegacionEmpleado";
import {Outlet} from 'react-router-dom';
import Loader from "./Loader";

const EmpleadoLayout = () => {
    return (
        <div className="d-flex">
            <NavegacionEmpleado />
            <div className='container content'>
                <Suspense fallback={<Loader />}>
                    {<Outlet />}
                </Suspense>
            </div>
        </div>
    );

};

export default EmpleadoLayout;
