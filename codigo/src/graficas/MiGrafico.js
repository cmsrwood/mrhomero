import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Ventas 2023',
      data: [50, 60, 70, 80, 90],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Ventas 2024',
      data: [40, 50, 60, 70, 80],
      backgroundColor: 'rgba(255, 206, 86, 0.8)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }
  ]
}

export default function MiGrafico() {
  return (
    <div>
      <h2>Gráfico de Ventas</h2>
      <Bar data={data}/>
    </div>
  );
}
