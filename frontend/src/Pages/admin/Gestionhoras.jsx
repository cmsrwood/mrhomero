import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Gestionhoras() {
    const params = useParams();
    const id = params.id
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    //Datos a traer
    const [horas, setHoras] = useState([]);
    const [horasTotales, setHorasTotales] = useState([]);
    const [empleado, setEmpleado] = useState([]);

    const [horasEsperadas, setHorasEsperadas] = useState(230);
    const [horasExtra, setHorasExtra] = useState(0);

    const anoActual = moment().format('YYYY');
    const mesActual = moment().format('M');
    const [ano, setAno] = useState(anoActual);
    const [mes, setMes] = useState(mesActual);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [horasRes, horasTotalesRes, empleadoRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/personas/empleados/mostrarHorasMes/${id}/${ano}/${mes}`),
                    axios.get(`${BACKEND_URL}/api/personas/empleados/horasPorMes/${id}/${ano}/${mes}`),
                    axios.get(`${BACKEND_URL}/api/personas/empleados/${id}`),

                ]);
                setHoras(horasRes.data);
                setHorasTotales(horasTotalesRes.data[0].horas);
                setHorasExtra(horasTotalesRes.data[0].horas - horasEsperadas);
                setEmpleado(empleadoRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated, id, ano, mes, horasEsperadas]);

    const handleAnoChange = (event) => {
        setAno(event.target.value);
        setIsDataUpdated(true);
    };

    const handleMesChange = (event) => {
        setMes(event.target.value);
        setIsDataUpdated(true);
    };

    function diaEspanol(dia) {
        switch (dia) {
            case 'Monday':
                return 'Lunes';
            case 'Tuesday':
                return 'Martes';
            case 'Wednesday':
                return 'Miercoles';
            case 'Thursday':
                return 'Jueves';
            case 'Friday':
                return 'Viernes';
            case 'Saturday':
                return 'Sabado';
            case 'Sunday':
                return 'Domingo';
            default:
                return dia;
        }
    }



    return (
        <div className='animate__animated animate__fadeIn'>
            <h1>Gestion de Horas</h1>
            <div className="text-center">
                <img className='rounded-circle' style={{ width: '150px' }} src={`${empleado.user_foto}`} alt={empleado.user_nom} />
                <h2 className='my-4 fw-bold'>{empleado.user_nom} {empleado.user_apels}</h2>
            </div>
            <div className='row w-100 justify-content-between my-3'>
                <select value={ano} onChange={handleAnoChange} name="" id="" className="form-select col-12 col-sm mx-2">
                    <option value={anoActual}>{anoActual}</option>
                    <option value={anoActual - 1}>{anoActual - 1}</option>
                    <option value={anoActual - 1}>{anoActual - 2}</option>
                    <option value={anoActual - 1}>{anoActual - 3}</option>
                    <option value={anoActual - 1}>{anoActual - 4}</option>
                </select>
                <select value={mes} onChange={handleMesChange} name="" id="" className="form-select col-12 col-sm mx-2">
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
            <div className="row cols-3 my-4">
                <h2 className='col'> <i className="bi bi-clock-history fs-1 col-4 me-2"></i>Horas esperadas: {horasEsperadas}</h2>
                <h2 className='col'> <i className="bi bi-clock fs-1 col-4 me-2"></i>Horas registradas: {horasTotales ? horasTotales : 0} </h2>
                <h2 className='col'> <i className="bi bi-stopwatch fs-1 col-4 me-2"></i>Horas extra: {horasExtra > 0 ? horasExtra : 0} </h2>
            </div>
            <div className="table-responsive scrollbar border" style={{ maxHeight: '265px' }}>
                <table className="table table-scrollbar fs-4 text-center table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope='col'>Dia</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Inicio</th>
                            <th scope="col">Fin</th>
                        </tr>
                    </thead>
                    <tbody >
                        {horas.map((hora) => (
                            <tr key={hora.id_horas}>
                                <td>{diaEspanol(moment(hora.fecha).format('dddd'))}</td>
                                <th scope="row">{moment(hora.fecha).format('DD-MM-YYYY')}</th>
                                <td>{moment(hora.hora_inicio).format('hh:mm:ss A')}</td>
                                <td>{moment(hora.hora_fin).format('hh:mm:ss A')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
