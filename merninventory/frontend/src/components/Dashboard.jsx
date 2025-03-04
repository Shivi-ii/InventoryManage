import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assuming you'll put custom styles here
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import SalesChart from './SalesChart';
import ExpensePieChart from './ExpensePieChart';
import ExpenseIncomePieChart from './ExpenseIncomePieChart';
import TopSellingProductsChart from './TopSellingProductsChart';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser)
      setUser(JSON.parse(storedUser)); // Get user details
      fetchData();
    }
  }, []);
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Get total orders
      const ordersResponse = await axios.get('http://localhost:5000/api/orders', {
        headers: { "Authorization": token } 
      });
      setTotalOrders(ordersResponse.data.length);

      // Get total suppliers
      const suppliersResponse = await axios.get('http://localhost:5000/api/suppliers', {
        headers: { "Authorization": token } 

      });
      setTotalSuppliers(suppliersResponse.data.length);

      // Get total inventory items
      const inventoryResponse = await axios.get('http://localhost:5000/api/inventory', {
        headers: { "Authorization": token } 
      });
      setTotalInventory(inventoryResponse.data.length);

      // Get total employees and employee data
      const employeesResponse = await axios.get('http://localhost:5000/api/employees', {
        headers: { "Authorization": token } 
      });
      setTotalEmployees(employeesResponse.data.length);
      setEmployees(employeesResponse.data);

      } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0 vh-100 bg-dark" style={{ position: 'fixed', left: 0, top: 0 }}>
            <Sidebar />
          </div>

          <div className="col-md-10 offset-md-2" style={{ marginTop: '60px' }}>
            <div className="mt-4 px-3">
              <h1>Admin Dashboard</h1>

              <div className="row mt-5">
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Sales</Card.Title>
                      <Card.Text>{totalOrders}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Suppliers</Card.Title>
                      <Card.Text>{totalSuppliers}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Products</Card.Title>
                      <Card.Text>{totalInventory}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Employees</Card.Title>
                      <Card.Text>{totalEmployees}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div>
              <ExpenseIncomePieChart/>
              </div>
              <div>
              <ExpensePieChart/>
              </div>
              <div>
              <SalesChart/>
              </div>
              <div>
              <TopSellingProductsChart/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
