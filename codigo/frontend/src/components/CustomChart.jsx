// CustomChart.js
import React from 'react';
import { Doughnut, Line, Bar, Bubble } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export default function CustomChart({ tipo, data, options }) {

  if (tipo === 'doughnut') {
    return <Doughnut data={data} options={options} height={500} />;
  } else if (tipo === 'line') {
    return <Line data={data} options={options} height={280} />;
  } else if (tipo === 'bar') {
    return <Bar data={data} options={options} />;
  } else if (tipo === 'bubble') {
    return <Bubble data={data} options={options} />;
  }

  return null;
}
