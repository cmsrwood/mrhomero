import React from "react";
import NavegacionEmpleado from "../navigation/NavegacionEmpleado";
import {Outlet} from 'react-router-dom';


const EmpleadoLayout = () => {
    return (
        <div className="d-flex">
            <NavegacionEmpleado />
            <div className='container content'>
                {<Outlet />}
            </div>
        </div>
    );

};

export default EmpleadoLayout;
