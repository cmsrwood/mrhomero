import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function RecompensasCliente() {

  const [puntos, setPuntos] = useState(0);
  const [recompensas, setRecompensas] = useState([]);
  const [recompensasObtenidas, setRecompensasObtenidas] = useState([]);

  const [mostrar, setMostrar] = useState('disponibles');

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const token = localStorage.getItem('token');
  const idUsuario = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [puntosRes, recompensasRes, recompensasObtenidasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/recompensas/mostrarPuntos/${idUsuario}`),
          axios.get(`${BACKEND_URL}/api/recompensas/mostrar`),
          axios.get(`${BACKEND_URL}/api/recompensas/mostrar/${idUsuario}`)
        ]);
        setPuntos(puntosRes.data[0].user_puntos);
        setRecompensas(recompensasRes.data);
        setRecompensasObtenidas(recompensasObtenidasRes.data);
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
      const confirm = await Swal.fire({
        title: '¿Estas seguro de reclamar esta recompensa?',
        text: "No podrás recuperar tus puntos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, cancelar',
        confirmButtonText: 'Si, reclamar'
      });
      if (!confirm.isConfirmed) {
        return;
      }
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
          title: 'Error',
          text: error.response.data
        });
      }
    }
  }

  function mostrarRecompensas(obtener) {
    setMostrar(obtener);
  }

  function mesANombre(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes - 1];
  }

  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Recompensas {mostrar == 'disponibles' ? 'disponibles' : 'obtenidas'}</h1>
          <h2>Puntos obtenidos: {puntos}</h2>
        </div>
        {mostrar == 'disponibles' ?
          <div>
            <div className="text-end">
              <button className='btn btn-warning my-4' onClick={() => mostrarRecompensas('obtenidas')}>Ver recompensas obtenidas</button>
            </div>
            <div>
              <div className="row scrollbar">
                {recompensas.map((recompensa) => (
                  <div className="col-12 border p-5 my-2" key={recompensa.id_recomp}>
                    <form onSubmit={recompensa.recomp_num_puntos <= puntos ? reclamarRecompensa(recompensa.id_recomp) : (e) => {
                      e.preventDefault();
                      Swal.fire({
                        title: `Te faltan ${recompensa.recomp_num_puntos - puntos} puntos para reclamar esta recompensa`,
                        icon: 'error',
                        showConfirmButton: true
                      });
                    }}
                    >
                      <div className="row align-items-center">
                        <div className="col-2">
                          <img src={`/images/recompensas/${recompensa.recomp_foto}`} className='rounded border img-fluid w-100' alt="" />
                        </div>
                        <div className="col-7 px-5 align-content-center">
                          <h2>{recompensa.recompensa_nombre}</h2>
                          <p>{recompensa.recompensa_descripcion}</p>
                          <div className="progress position-relative" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-warning" style={{ width: `${(puntos / recompensa.recomp_num_puntos) * 100}%` }}></div>
                            <p className='fw-bold position-absolute top-50 end-50 translate-middle text-black'>{puntos}/{recompensa.recomp_num_puntos}</p>
                          </div>
                        </div>
                        <div className={`col-3 text-center ${recompensa.recomp_num_puntos <= puntos ? "" : "d-none"}`}>
                          <button type="submit" className='btn btn-warning'>Reclamar recompensa</button>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
          :
          <div>
            <div className="text-end">
              <button className='btn btn-warning my-4' onClick={() => mostrarRecompensas('disponibles')}>Ver recompensas disponibles</button>
            </div>
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
                        </div>
                        <div className={`col-4 text-center`}>
                          <h2>Codigo para reclamar</h2>
                          <h1>{recompensa.codigo}</h1>
                          <p className='mt-3'>Lo reclamaste el dia {moment(recompensa.fecha_reclamo).format('DD')} de {mesANombre(moment(recompensa.fecha_reclamo).format('MM'))}</p>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
