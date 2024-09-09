import React from 'react'
import CustomChart from '../../components/CustomChart';
import img from '../../assets/img/img.png'
import NavegacionAdmin from '../../navigation/NavegacionAdmin'

export default function Dashboard() {
  function card() {
    return (
      <div className="col-6 col-sm">
        <div className="card text-center my-2">
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Producto</h5>
          </div>
        </div>
      </div>
    )
  }
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
    maintainAspectRatio: false,
  };
  return (
    <div className="d-flex">
      <NavegacionAdmin />
      <div className='container content'>
        <div className="row g-4">
          <div className="text-center justify-content-center">
            <CustomChart data={data} tipo='line' options={options} />
          </div>
          <div className="col-12 col-sm border border-2 mx-0 mx-sm-5 border-secondary  text-center">
            <h3 className='pt-4'>Prductos vendidos</h3>
            <h4 className='pt-2'>1234 unidades</h4>
            <h4 className='pb-4 text-success'>+8% este mes</h4>
          </div>
          <div className="col-12 col-sm border mx-0 mx-sm-5 border-2 border-secondary text-center">
            <h3 className='pt-4'>Total ganancias</h3>
            <h4 className='pt-2'>COP 10.000.000</h4>
            <h4 className='pb-4 text-danger'>-5% este mes</h4>
          </div>
        </div>
        <div className="container border border-2 border-secondary my-5 p-3">
          <div className="row w-100 justify-content-between">
            <h4 className="col-12 col-sm-10">Productos más vendidos</h4>
            <select name="" id="" className="form-select col-12 col-sm mx-2">
              <option value="">Enero</option>
              <option value="">Febrero</option>
              <option value="">Marzo</option>
              <option value="">Abril</option>
            </select>
          </div>
          <div className="row px-2">
            {card()}
            {card()}
            {card()}
            {card()}
            {card()}
            {card()}
          </div>
        </div>
      </div>
    </div>
  )
}

