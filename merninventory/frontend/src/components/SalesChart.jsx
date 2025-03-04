import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [viewMode, setViewMode] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { "Authorization": token } 
      });
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error.message || error);
    }
  };

  const filterSalesData = () => {
    if (!startDate || !endDate) return salesData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return salesData.filter(order => {
      if (!order.createdAt) return false;
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });
  };

  const processSalesData = () => {
    const filteredData = filterSalesData();
    if (!filteredData.length) return { labels: [], datasets: [] };

    let labels = [];
    let salesByLabel = {};

    if (viewMode === 'weekly') {
      labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      filteredData.forEach(order => {
        const day = new Date(order.createdAt).getDay();
        salesByLabel[labels[day]] = (salesByLabel[labels[day]] || 0) + order.totalSellingPrice;
      });
    } 
    else if (viewMode === 'monthly') {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      filteredData.forEach(order => {
        const month = new Date(order.createdAt).getMonth();
        salesByLabel[labels[month]] = (salesByLabel[labels[month]] || 0) + order.totalSellingPrice;
      });
    } 
    else if (viewMode === 'yearly') {
      const years = filteredData.map(order => new Date(order.createdAt).getFullYear());
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      labels = Array.from({ length: maxYear - minYear + 1 }, (_, i) => (minYear + i).toString());

      filteredData.forEach(order => {
        const year = new Date(order.createdAt).getFullYear().toString();
        salesByLabel[year] = (salesByLabel[year] || 0) + order.totalSellingPrice;
      });
    }

    return {
      labels,
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.9)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: labels.map(label => salesByLabel[label] || 0),
          borderRadius: 6,
        },
      ],
    };
  };

  const chartData = processSalesData();
  return (
    <div className="mt-5 p-4 rounded shadow-lg" style={{ background: '#f9f9f9', borderRadius: '12px' }}>
      <h3 className="text-center text-primary mb-4" style={{ fontWeight: 'bold' }}>Sales Overview</h3>
      
      {/* Date Range Inputs */}
      <div className="d-flex justify-content-center mb-3">
        <div className="me-3">
          <label className="fw-bold me-2 text-secondary">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
            style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '5px' }}
          />
        </div>

        <div>
          <label className="fw-bold me-2 text-secondary">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control"
            style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '5px' }}
          />
        </div>
      </div>

      {/* View Mode Selection */}
      <div className="d-flex justify-content-center mb-4">
        <label htmlFor="viewMode" className="fw-bold me-3 text-secondary">View Mode:</label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="form-select w-auto"
          style={{ borderRadius: '8px', padding: '5px', border: '1px solid #007bff', color: '#007bff', fontWeight: 'bold' }}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="p-3 rounded" style={{ background: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Sales by ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`,
                font: { size: 18, weight: 'bold' },
                color: '#333',
              },
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#007bff',
                  font: { weight: 'bold' },
                },
                grid: { display: false },
              },
              y: {
                ticks: {
                  color: '#28a745',
                  font: { weight: 'bold' },
                },
                grid: { color: 'rgba(0,0,0,0.1)' },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesChart;
