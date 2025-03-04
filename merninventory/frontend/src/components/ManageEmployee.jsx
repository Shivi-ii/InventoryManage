import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const token = localStorage.getItem('token'); 

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': token // Send token in the request headers
      }
      });
      setEmployees(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error fetching employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'Authorization': token // Send token for authentication
      }
      });
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
      toast.error("Employee deleted successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error deleting employee');
      console.error('Error deleting employee:', err);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/employees/update/${editEmployee._id}`, editEmployee, {
        headers: {
          'Authorization': token, // Send token for authentication
          'Content-Type': 'application/json'
      }
      });
      const updatedEmployee = res.data;
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
      );
      setEditEmployee(null);
      toast.success("Employee updated successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error updating employee');
      console.error('Error updating employee:', err);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.department.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ minWidth: "600px" }}>
      <h3>Manage Employees</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search employees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredEmployees.length === 0 ? (
        <div>No employees found</div>
      ) : (
        <table className="table table-bordered" style={{ width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(employee)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editEmployee && (
        <div className="edit-form mt-4" style={{ position: "fixed", left: "30%", top: "4rem", width: "50%", background: "#e3f2fd", padding: "1rem", zIndex: 1000 }}>
          <h4>Edit Employee</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={editEmployee.name}
                onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                value={editEmployee.department}
                onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={editEmployee.email}
                onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                value={editEmployee.salary}
                onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Update Employee</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditEmployee(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageEmployee;
