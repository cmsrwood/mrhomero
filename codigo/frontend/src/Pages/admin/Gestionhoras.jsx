import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Gestionhoras() {
    const params = useParams();
    const id = params.id
    console.log(id)
    const [horas, setHoras] = useState([]);
    const [horasExtra, setHorasExtra] = useState([]);
    const [horasEsperadas, setHorasEsperadas] = useState(0);
    const anoActual = moment().format('YYYY');
    const mesActual = moment().format('M');
    const[ano, setAno] = useState(anoActual);
    const[mes, setMes] = useState(mesActual);
    const[isDataUpdated, setIsDataUpdated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [horasRes, horasExtraRes, horasEsperadasRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/empleados/mostrarHorasEmpleadoMes/${id}/${ano}/${mes}`),
                ]);
                setHoras(horasRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    })
    return (
        <div>
            <div className="">
                <h1>Gestion de Horas</h1>
                <div className="row cols-3 my-4">
                    <h2 className='col'> <i className="bi bi-clock-history fs-1 col-4 me-2"></i>Horas esperadas: 666</h2>
                    <h2 className='col'> <i className="bi bi-clock fs-1 col-4 me-2"></i>Horas registradas: 120</h2>
                    <h2 className='col'> <i className="bi bi-stopwatch fs-1 col-4 me-2"></i>Horas extra: 30 </h2>
                </div>
                <div className="table-responsive">
                    <table className="table border fs-4 text-center table-striped table-responsive ">
                        <thead>
                            <tr>
                                <th scope="col"> id</th>
                                <th>Dia</th>
                                <th scope="col">Inicio</th>
                                <th scope="col">Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Lunes</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">2 </th>
                                <td>Martes</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">3 </th>
                                <td>Miercoles</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Jueves</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Viernes</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Sabado</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>Domingo</td>
                                <td>12:12 AM</td>
                                <td>12:12 PM</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
