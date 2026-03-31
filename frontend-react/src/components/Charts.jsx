import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function GrowthChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Market Leader',
        data: [120, 140, 155, 170, 190, 210, 235, 258, 280, 310, 340, 372],
        borderColor: '#111827',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#111827',
        fill: false,
      },
      {
        label: 'Your Idea (Projected)',
        data: [null, null, null, null, null, null, 10, 28, 52, 88, 130, 185],
        borderColor: '#D1D5DB',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: '#D1D5DB',
        borderDash: [5, 4],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
    },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      filler: false,
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 12, weight: '500', family: "'Inter', sans-serif" },
          color: '#9CA3AF',
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        titleColor: '#111827',
        bodyColor: '#6B7280',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12, weight: '600', family: "'Inter', sans-serif" },
        bodyFont: { size: 11, weight: '400', family: "'Inter', sans-serif" },
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { 
          display: true,
          color: '#F1F5F9',
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          font: { size: 11, weight: '400', family: "'Inter', sans-serif" },
          color: '#9CA3AF',
          padding: 8,
        },
      },
      y: {
        grid: { 
          color: '#F1F5F9',
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          font: { size: 11, weight: '400', family: "'Inter', sans-serif" },
          color: '#9CA3AF',
          padding: 8,
        },
      },
    },
  };

  return <Line data={data} options={options} height="300px" />;
}

export function MarketShareChart() {
  const data = {
    labels: ['Your Idea', 'Market Leader', 'Competitor 1', 'Competitor 2', 'Others'],
    datasets: [
      {
        data: [28, 35, 18, 12, 7],
        backgroundColor: [
          '#111827',
          '#6B7280',
          '#D1D5DB',
          '#E5E7EB',
          '#F3F4F6',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 12, weight: '500', family: "'Inter', sans-serif" },
          color: '#9CA3AF',
          padding: 16,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        titleColor: '#111827',
        bodyColor: '#6B7280',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12, weight: '600', family: "'Inter', sans-serif" },
        bodyFont: { size: 11, weight: '400', family: "'Inter', sans-serif" },
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
    },
  };

  return <Doughnut data={data} options={options} height="300px" />;
}
