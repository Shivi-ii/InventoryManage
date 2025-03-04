import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopSellingProductsChart = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  const fetchTopSellingProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await axios.get('http://localhost:5000/api/top-selling-products',{
        headers: { "Authorization": token } 
      });
      setTopProducts(response.data);
    } catch (error) {
      console.error('Error fetching top selling products:', error.message || error);
    }
  };

  // Extract labels and data
  const labels = topProducts.map((product) => product._id);
  const dataValues = topProducts.map((product) => product.totalQuantitySold);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Units Sold',
        data: dataValues,
        backgroundColor: ['#FF5733', '#33A1FF', '#FFC300', '#DA33FF', '#33FF57'],
        borderRadius: 10, // Rounded bar corners
        barThickness: 50, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { font: { size: 14 }, color: '#444' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14 }, color: '#444' },
        grid: { borderDash: [5, 5] },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top Selling Products',
        font: { size: 18, weight: 'bold' },
        color: '#222',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Top Best-Selling Products</h3>
      <div style={styles.chartWrapper}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  chartWrapper: {
    width: '100%',
    height: '400px',
    padding: '20px',
    borderRadius: '10px',
    background: '#f9f9f9',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default TopSellingProductsChart;
