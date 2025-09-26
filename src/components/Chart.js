
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '@mui/material/styles';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ chartData, days }) => {
  const theme = useTheme();

  const data = {
    
    labels: chartData.map(pricePoint => new Date(pricePoint[0]).toLocaleDateString()),
    datasets: [
      {
        label: `Price (Past ${days} Days) in USD`,
        
        data: chartData.map(pricePoint => pricePoint[1]),
        borderColor: theme.palette.primary.main, 
        backgroundColor: `${theme.palette.primary.main}33`, 
        pointRadius: 1,
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
    scales: {
        x: {
            ticks: {
                maxTicksLimit: 10, 
            }
        }
    }
  };

  return <Line options={options} data={data} />;
};

export default Chart;