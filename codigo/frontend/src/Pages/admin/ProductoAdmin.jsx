import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
import Producto from '../../components/Producto';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function ProductoAdmin() {
    
    return (
        <div className=''>
            <Producto/>
        </div>
    );

}
