import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface IPerformance {
    userId: string;
    userName: string;
    tasks: number;
    totalEstTime: number;
    totalActualTime: number;
  }
interface IPerformanceChartProps {
    data: IPerformance[];
  }
  
const PerformanceChart: React.FC<IPerformanceChartProps> = ({ data }) => {
    
      
      
  const chartData = {
    labels: data.map(d => d.userName),
    datasets: [
      {
        label: 'Estimated Time (hours)',
        data: data.map(d => d.totalEstTime),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Actual Time (hours)',
        data: data.map(d => d.totalActualTime),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Performance Chart',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PerformanceChart;
