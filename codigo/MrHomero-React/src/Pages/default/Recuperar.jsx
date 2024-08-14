import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavegacionDefault from './PlantillaDefault/NavegacionDefault'
import axios from 'axios'

export default function Ingresar() {

    axios.defaults.withCredentials = true

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
        codigo: ""
    });

    const handleChange = (event) => {
        setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/auth/recuperar", user);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Contraseña restaurada',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
                navigate("/ingresar");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data || 'Algo salió mal',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        }
    }

    return (
        <div className="">
            <NavegacionDefault />
            <div className='container-fluid p-5 my-5 text-center border wipe-in-down' transition-style="in:wipe:up" style={{ borderRadius: '20px', width: '85%', boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.3)' }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-5 align-content-center align-items-center p-5" style={{ boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.2)' }}>
                        <form onSubmit={handleSubmit}>
                            <i className='display-1 bi bi-person-circle'></i>
                            <div className="form-floating my-5">
                                <input type="email" className="form-control" placeholder="email" name='email' onChange={handleChange} />
                                <label htmlFor="floatingInput">Contraseña</label>
                            </div>
                            <div className="form-floating my-5">
                                <input type="password" className="form-control" placeholder="Contraseña" name='password' onChange={handleChange} />
                                <label htmlFor="floatingInput">Confirmar contraseña</label>
                            </div>
                            <div className="form-floating my-5">
                                <input type="text" className="form-control" placeholder="Contraseña" name='password' onChange={handleChange} />
                                <label htmlFor="floatingInput">Ingresa el codigo</label>
                            </div>
                            <button className="btn btn-outline-warning" type="submit">Recuperar contraseña</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
