import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface HourData {
  temperature: number;
  humidity: number;
  uv: number;
  time: string;
}

interface TemperatureChartProps {
  weatherData: {
    date: string;
    hours: HourData[];
  }[];
}

const TemperatureChart: React.FC<TemperatureChartProps & { selectedDate: string | null }> = ({
  weatherData,
  selectedDate,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<'temperature' | 'humidity' | 'uv'>('temperature');

  // Get the current hour in "HH:00" format
  const currentHour = new Date().getHours().toString().padStart(2, '0') + ":00";

  // Create a gradient for the chart background
  const createGradient = (ctx: CanvasRenderingContext2D, height: number, color: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(1, `${color}10`);
    return gradient;
  };

  const colors = {
    temperature: '#007bff',
    humidity: '#28a745',
    uv: '#ffc107',
  };

  const currentDayData = selectedDate
    ? weatherData.filter((item) => item.date === selectedDate)
    : [];

  const chartLabels = currentDayData.flatMap((item) =>
    item.hours.map((hour) => hour.time.split(' ')[1])
  );
  const chartValues = currentDayData.flatMap((item) =>
    item.hours.map((hour) => hour[selectedProperty])
  );

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow full control of the height
    plugins: {
      legend: { display: false }, // Hide the legend
      tooltip: {
        enabled: true,
        backgroundColor: '#000000', // Black tooltip background
        titleColor: '#ffffff', // White tooltip title text
        bodyColor: '#ffffff', // White tooltip body text
        borderWidth: 1,
        borderColor: '#ffffff', // Optional: White border for the tooltip
        displayColors: false, // Hide colored boxes in the tooltip
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.raw} ${selectedProperty === 'temperature' ? '°F' : ''}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Remove x-axis gridlines
        ticks: {
          display: false,
          color: '#ffffff', // White x-axis labels
        },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.2)' }, // Light white gridlines
        ticks: {
          display: false,
          color: '#ffffff', // White y-axis labels
        },
      },
    },
    elements: {
      point: {
        radius: (context) => {
          const hour = chartLabels[context.dataIndex];
          return hour === currentHour ? 6 : 0; // Highlight the current hour
        },
        hoverRadius: 8,
        backgroundColor: '#ffffff', // White point color
      },
    },
  };



  const data: ChartData<'line'> = {
    labels: chartLabels,
    datasets: [
      {
        label: `${selectedProperty.charAt(0).toUpperCase() + selectedProperty.slice(1)}`,
        data: chartValues,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const height = context.chart.height || 400;
          return createGradient(ctx, height, colors[selectedProperty]);
        },
        borderColor: colors[selectedProperty],
        borderWidth: 2,
        pointBackgroundColor: (context) => {
          const hour = chartLabels[context.dataIndex];
          return hour === currentHour ? colors[selectedProperty] : 'transparent';
        },
        pointBorderColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <Dropdown
        style={{ textAlign: 'center', marginBottom: '1rem' }}
        onSelect={(key) => setSelectedProperty(key as 'temperature' | 'humidity' | 'uv')}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {`${selectedProperty.charAt(0).toUpperCase() + selectedProperty.slice(1)}`}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="temperature">Temperature</Dropdown.Item>
          <Dropdown.Item eventKey="humidity">Humidity</Dropdown.Item>
          <Dropdown.Item eventKey="uv">UV</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {currentDayData.length > 0 ? (
        <Line data={data} options={options} style={{ maxHeight: '300px' }} />
      ) : (
        <p>Please select a date to view the chart.</p>
      )
      }
    </div >
  );

};

export default TemperatureChart;
