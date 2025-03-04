import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login'; // Ensure the path is correct
import Signup from './components/Signup'; // Ensure the path is correct
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import AddOrder from './components/AddOrder'; // Ensure the path is correct
import Layout from './components/Layout'; // Ensure the path is correct
import './App.css';
import ManageOrders from './components/ManageOrders'; // Ensure the path is correct
import AddSupplier from './components/AddSupplier'; // Ensure the path is correct
import ManageSuppliers from './components/ManageSuppliers'; // Ensure the path is correct
import EditSupplier from './components/EditSupplier'; // Ensure the path is correct
import AddInventoryItem from './components/AddInventoryItem'; // Ensure the path is correct
import ManageInventories from './components/ManageInventories'; // Ensure the path is correct
import AddEmployee from './components/AddEmployee';
import Home from './components/Home';
import ManageEmployee from './components/ManageEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          {/* Nested routes under /dashboard */}
          <Route index element={<Dashboard />} /> {/* Default route for /dashboard */}
          <Route path="orders/add" element={<AddOrder />} />
          <Route path="orders/view" element={<ManageOrders />} />
          <Route path="Employees/add" element={<AddEmployee/>}/>
          <Route path="suppliers/add" element={<AddSupplier />} />
          <Route path="suppliers/manage" element={<ManageSuppliers />} />
          <Route path="suppliers/edit/:id" element={<EditSupplier />} />
          <Route path="inventory/add" element={<AddInventoryItem />} />
          <Route path="inventory/manage" element={<ManageInventories />} />
          <Route path="Employees/manage" element={<ManageEmployee/>}/>
        </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
