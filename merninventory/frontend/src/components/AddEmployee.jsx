import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddEmployee = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const newEmployee = { name, department, email, salary };
      await axios.post('http://localhost:5000/api/employees/add', newEmployee, {
        headers: { 
          "Authorization": token, // Attach token for authentication
          "Content-Type": "application/json" 
      }
      });
      toast.success('Employee added successfully!', { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      setName('');
      setDepartment('');
      setEmail('');
      setSalary('');
    } catch (error) {
      toast.error('Error adding employee. Please try again.', { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
      
      <ToastContainer />
      
    </div>
  );
};

export default AddEmployee;
