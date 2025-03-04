import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseIncomePieChart = () => {
  const [data, setData] = useState({ totalIncome: 0, totalExpenses: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await axios.get('http://localhost:5000/api/expenseIncome', {
        headers: { "Authorization": token } 
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [data.totalIncome, data.totalExpenses],
        backgroundColor: ['#4CAF50', '#FF5733'],
        hoverBackgroundColor: ['#2E7D32', '#D84315'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Income vs. Expense Breakdown</h3>

      {/* Pie Chart with Wider Design */}
      <div style={styles.chartCard}>
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { size: 14 },
                  color: '#444',
                },
              },
              title: {
                display: true,
                text: 'Income vs. Expenses',
                font: { size: 18, weight: 'bold' },
                color: '#222',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Updated Styling with Wider Layout
const styles = {
  container: {
    maxWidth: '800px', // Increased width
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  chartCard: {
    width: '100%',
    height: '450px', // Increased height for better proportions
    padding: '20px',
    borderRadius: '10px',
    background: '#f9f9f9',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default ExpenseIncomePieChart;
