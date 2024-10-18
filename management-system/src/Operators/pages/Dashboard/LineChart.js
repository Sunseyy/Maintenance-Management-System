// src/LineChart.js
import React, { useRef } from 'react'; // Ensure useRef is imported
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const chartRef = useRef(null); // Example usage of useRef

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChart;
