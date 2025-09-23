// src/components/Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '@mui/material/styles';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ chartData, days }) => {
  const theme = useTheme();

  const data = {
    // Format the timestamp into a readable date for the labels
    labels: chartData.map(pricePoint => new Date(pricePoint[0]).toLocaleDateString()),
    datasets: [
      {
        label: `Price (Past ${days} Days) in USD`,
        // Use just the price for the data
        data: chartData.map(pricePoint => pricePoint[1]),
        borderColor: theme.palette.primary.main, // Use the theme's primary color
        backgroundColor: `${theme.palette.primary.main}33`, // Use primary color with opacity
        pointRadius: 1,
        tension: 0.1, // Makes the line slightly curved
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
                // Reduces the number of visible date labels on the x-axis for clarity
                maxTicksLimit: 10, 
            }
        }
    }
  };

  return <Line options={options} data={data} />;
};

export default Chart;