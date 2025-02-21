import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Recuperar() {
    axios.defaults.withCredentials = true

    const navigate = useNavigate();
    const [userEmailRecuperar, setUser] = useState({
        email: ""
    });

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/api/auth/recuperar`, userEmailRecuperar);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Continuar'
                });
                navigate("/recuperar");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data || 'Algo salio mal',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        }
    };

    return (
        <div className=''>
            <div className='container-fluid p-5 my-5 text-center border wipe-in-down' transition-style="in:wipe:up" style={{ borderRadius: '20px', width: '85%', boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.3)' }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-5 align-content-center align-items-center p-5" style={{ boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.2)' }}>
                        <form onSubmit={handleSubmit}>
                            <i className='display-1 bi bi-person-circle'></i>
                            <div className="form-floating my-5">
                                <input type="email" className="form-control" placeholder="email" name='email' onChange={handleChange} required/>
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning w-100 rounded-5 mb-2 py-2">Enviar Codigo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}