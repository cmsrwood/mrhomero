import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2'

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function Horas() {

  const [horas, setHoras] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const token = localStorage.getItem('token');
  const id = JSON.parse(atob(token.split(".")[1])).id;
  const mes = moment().format('M');
  const ano = moment().format('YYYY');
  const fecha = moment().format('YYYY-MM-DD');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [horasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/empleados/horasDia/${id}/${fecha}`),
        ]);
        setHoras(horasRes.data);
      } catch (error) {
        console.log(error);
      }
      setDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, id, fecha]);

  const agregarHoraInicio = async () => {
    const hora_inicio = moment().format(' HH:mm:ss');
    try {
      await axios.post(`${BACKEND_URL}/api/empleados/horaInicio/${id}`, { hora_inicio, fecha });
      Swal.fire({
        icon: 'success',
        title: 'Hora de inicio registrada',
        showConfirmButton: false,
        timer: 1500
      })
      setDataUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };
  const agregarHoraFin = async () => {
    const hora_fin = moment().format(' HH:mm:ss');
    try {
      await axios.post(`${BACKEND_URL}/api/empleados/horaFin/${id}`, { hora_fin, fecha });
      Swal.fire({
        icon: 'success',
        title: 'Hora de fin registrada, gracias por trabajar hoy',
        showConfirmButton: false,
        timer: 1500
      })
      setDataUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Horas Empleados</h1>
      {horas.length === 0 ?
        <div>
          <p>No hay horas registradas hoy</p>
          <button onClick={agregarHoraInicio} type='submit' className='btn btn-success'>Hora de inicio </button>
        </div>
        :
        <div>
          {horas.hora_fin === null ?
            <div>
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="">
                    <h5 className="card-title">Hora de inicio: {horas.hora_inicio}</h5>
                    <button onClick={agregarHoraFin} type='submit' className='btn btn-danger ms-3'>Hora de fin</button>
                  </div>
                  <div className="">
                    <h5>Hora de fin:</h5>
                  </div>
                </div>
              </div>
            </div>
            :
            <div>
              Gracias por trabajar hoy
            </div>
          }
        </div>
      }
    </div>
  )
}
