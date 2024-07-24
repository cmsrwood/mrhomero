import React from 'react'
import CustomChart from '../../graficas/CustomChart'
export default function Dashboard() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [65, 59, 80, 81, 56, 55]
      },
      {
        label: 'Gastos',
        data: [28, 48, 40, 19, 86, 27]
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className='container pt-3'>
      <div className="row g-4">
        <div className="text-center justify-content-center">
          <CustomChart data={data} tipo='line' options={options} />
        </div>
        <div className="col-12 col-sm border border-2 mx-5 border-secondary  text-center">
          <h3 className='pt-4'>Prductos vendidos</h3>
          <p className='pt-2'>1234 unidades</p>
          <h4 className='pb-4 text-success'>+ 8% este mes</h4>
        </div>
        <div className="col-12 col-sm border mx-5 border-2 border-secondary text-center">
          <h3 className='pt-4'>Total ganancias</h3>
          <h4 className='pt-2'>COP 10.000.000</h4>
          <h4 className='pb-4 text-danger'>-5 % este mes</h4>
        </div>
      </div>
    </div>
  )
}
