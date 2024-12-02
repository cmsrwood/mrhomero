import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function RecompensasObtenidas() {

    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const [recompensas, setRecompensas] = useState([]);
    const [recompensasObtenidas, setRecompensasObtenidas] = useState([]);
    console.log(recompensasObtenidas)
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recompensasRes, recompensasObtenidasRes, clientesRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/recompensas/mostrar`),
                    axios.get(`${BACKEND_URL}/api/recompensas/mostrarRecompensasObtenidas/`),
                    axios.get(`${BACKEND_URL}/api/clientes/mostrar`)
                ]);
                setRecompensas(recompensasRes.data);
                setRecompensasObtenidas(recompensasObtenidasRes.data);
                setClientes(clientesRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated]);

    return (
        <div>
            <div>
                <div className="row mt-2 g-5 scrollbar">
                    {recompensasObtenidas.map((recompensa) => (
                        <div className="col-12 border my-2 p-5" key={recompensa.id_recomp_obt}>
                            <form>
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <img src={`/images/recompensas/${recompensas.find(recompensa => recompensa.id_recomp == recompensa.id_recomp).recomp_foto}`} className='rounded border img-fluid w-100' alt="" />
                                    </div>
                                    <div className="col-6 px-5 align-content-center">
                                        <h2>{recompensas.find(recompensa => recompensa.id_recomp == recompensa.id_recomp).recompensa_nombre}</h2>
                                        <p>{recompensas.find(recompensa => recompensa.id_recomp == recompensa.id_recomp).recompensa_descripcion}</p>
                                        <p className='text-warning'>{clientes.find(cliente => cliente.id_user == recompensa.id_user).user_nom} {clientes.find(cliente => cliente.id_user == recompensa.id_user).user_apels}</p>
                                        <p className=''>{moment(recompensa.fecha_obtencion).format('DD/MM/YYYY HH:mm')}</p>
                                    </div>
                                    <div className={`col-4 text-center`}>
                                        <button className='btn btn-warning' onClick={() => { axios.delete(`${BACKEND_URL}/api/recompensas/${recompensa.id_recomp_obt}`, { withCredentials: true }); setIsDataUpdated(true); }}><i className="bi bi-trash"></i> Eliminar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
