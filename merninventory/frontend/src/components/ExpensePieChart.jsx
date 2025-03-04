import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const [expenses, setExpenses] = useState({
    productCosts: 0,
    employeeSalaries: 0,
    rent: 0,
    marketing: 0,
    utilities: 0,
    taxes: 0,
  });

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    try {
      const response = await axios.get('http://localhost:5000/api/expenseChart/expense', {
        headers: { "Authorization": token }  // Ensure token is sent
      });
      const data = response.data;

      setExpenses(prev => ({
        ...prev,
        productCosts: data.productCosts || 0,
        employeeSalaries: data.employeeSalaries || 0,
      }));
    } catch (error) {
      console.error('Error fetching expense data:', error.message || error);
    }
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenses(prev => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value), // Ensure real-time update
    }));
  };
  

  const chartData = {
    labels: ['Product Costs', 'Employee Salaries', 'Rent', 'Marketing', 'Utilities', 'Taxes'],
    datasets: [
      {
        data: Object.values(expenses),
        backgroundColor: ['#FF5733', '#33A1FF', '#33FF57', '#FFC300', '#DA33FF', '#FF69B4'], // Updated taxes to pink
        hoverBackgroundColor: ['#D84315', '#1976D2', '#2E7D32', '#FFA000', '#8E24AA', '#FF1493'], // Adjusted hover color for taxes
        borderWidth: 2,
      },
    ],
  };
  

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Expense Distribution</h3>

      {/* Manual Expense Inputs */}
      <div style={styles.inputContainer}>
        {['rent', 'marketing', 'utilities', 'taxes'].map((field) => (
          <div key={field} style={styles.inputWrapper}>
            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="number"
              name={field}
              value={expenses[field]}
              onChange={handleExpenseChange}
              style={styles.input}
            />
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div style={styles.chartContainer}>
        <div style={styles.chartCard}>
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    font: { size: 14 },
                    color: '#444',
                  },
                },
                title: {
                  display: true,
                  text: 'Expense Breakdown',
                  font: { size: 18, weight: 'bold' },
                  color: '#222',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '750px',
    margin: '40px auto',
    padding: '30px',
    textAlign: 'center',
    background: '#ffffff',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px',
    padding: '10px',
    background: '#f4f4f4',
    borderRadius: '8px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '16px',
    color: '#444',
    fontWeight: '600',
    marginBottom: '6px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #aaa',
    width: '120px',
    textAlign: 'center',
    fontSize: '16px',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCard: {
    width: '100%',
    height: '400px',
    padding: '20px',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ExpensePieChart;
