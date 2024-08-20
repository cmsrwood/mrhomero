import React from 'react'

export default function Gestionhoras() {
    return (
        <div className="p-5">
            <h1>Gestion de Horas</h1>
            <div className="container">
                
                <div className="row cols-3 my-4">
                    <h2 className='col'> <i className="bi bi-clock-history fs-1 col-4 me-2"></i>Horas esperadas: 666</h2>
                    <h2 className='col'> <i className="bi bi-clock fs-1 col-4 me-2"></i>Horas registradas: 120</h2>
                    <h2 className='col'> <i className="bi bi-stopwatch fs-1 col-4 me-2"></i>Horas extra: 30 </h2>
                </div>
              
                <table className="table border fs-4 text-center table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th>Dia</th>
                            <th scope="col">Inicio</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Horas extra</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Lunes</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">2 </th>
                            <td>Martes</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">3 </th>
                            <td>Miercoles</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Jueves</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Viernes</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>Sabado</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        <tr>
                            <th scope="row">7</th>
                            <td>Domingo</td>
                            <td>12:12 AM</td>
                            <td>12:12 PM</td>
                            <td>2 horas</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
