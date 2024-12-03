import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Gestionhoras from './Gestionhoras';
import img from '../../assets/img/img.png'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"




export default function HorasEmpleados() {
  const [empleados, setEmpleados]=useState([])
  const[isDataUpdated, setIsDataUpdated] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empleadosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/empleados/mostrarEmpleados`),
        ]);
        setEmpleados(empleadosRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);


  
    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
      {empleados.map((empleado)=>(
        <div className="col card text-center p-2" key={empleado.id_user}>
        <img src={img} height={200} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="card-title" >{empleado.user_nom} {empleado.user_apels}</h3>
            <p className="card-text">Horario de trabajo</p>
          </div>

        </div>
        <Link to={'../admin/gestionhoras'} type="button" className="btn btn-warning ms-2"><i className="bi bi-info-circle"></i> Información</Link>
      </div>
      ))}
      </div>
      
    )
  
  
}
