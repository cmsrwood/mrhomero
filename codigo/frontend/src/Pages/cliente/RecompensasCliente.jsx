import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function RecompensasCliente() {

  const [puntos, setPuntos] = useState(0);
  const [recompensas, setRecompensas] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const token = localStorage.getItem('token');
  const idUsuario = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [puntosRes, recompensasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/recompensas/mostrarPuntos/${idUsuario}`),
          axios.get(`${BACKEND_URL}/api/recompensas/mostrar`)
        ]);
        setPuntos(puntosRes.data[0].user_puntos);
        setRecompensas(recompensasRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated, idUsuario]);

  const reclamarRecompensa = (id_recompensa) => async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${BACKEND_URL}/api/recompensas/mostrarPuntos/${idUsuario}`);
      setPuntos(res.data[0].user_puntos);
      setIsDataUpdated(true);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/recompensas/reclamarRecompensa/${idUsuario}`, { id_recompensa });
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data.title,
          text: res.data.message
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data
        });
      }
    }
  }

  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Recompensas</h1>
          <h2>Puntos obtenidos: {puntos}</h2>
        </div>
        <div>
          <div className="row scrollbar">
            {recompensas.map((recompensa) => (
              <div className="col-12 border p-5 my-3" key={recompensa.id_recomp}>
                <form onSubmit={reclamarRecompensa(recompensa.id_recomp)}>
                  <div className="row align-items-center">
                    <div className="col-2">
                      <img src={`/images/recompensas/${recompensa.recomp_foto}`} className='rounded border img-fluid w-100' alt="" />
                    </div>
                    <div className="col-7 px-5 align-content-center">
                      <h2>{recompensa.recompensa_nombre}</h2>
                      <p>{recompensa.recompensa_descripcion}</p>
                      <div className="progress position-relative" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-warning" style={{ width: `${(puntos / recompensa.recomp_num_puntos) * 100}%` }}></div>
                        <p className='fw-bold position-absolute top-50 end-50 translate-middle'>{puntos}/{recompensa.recomp_num_puntos}</p>
                      </div>
                    </div>
                    <div className="col-3">
                      <button type="submit" className='btn btn-warning'>Reclamar recompensa</button>
                    </div>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
