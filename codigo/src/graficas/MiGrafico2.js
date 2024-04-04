import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const data = {
  labels: [
    'Hamburguesas',
    'Perros',
    'Salchipapas'
  ],
  datasets: [
    {
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }
  
]
};

export default function MiGrafico2() {
  return (
    <div>
      <h2>Gráfico de productos</h2>
      <Bar data={data}/>
    </div>
  );
}
