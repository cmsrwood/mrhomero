import React from 'react'

export default function Gestionhoras() {
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
