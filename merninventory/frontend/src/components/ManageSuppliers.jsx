import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [editSupplier, setEditSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const token = localStorage.getItem('token'); 

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/suppliers', {
        headers: {
          'Authorization': token // Send token in the request headers
      }
      });
      setSuppliers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error fetching suppliers');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
        headers: {
          'Authorization': token // Send token in the request headers
      }
      });
      setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== id));
      toast.error("Supplier deleted successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error deleting supplier');
      console.error('Error deleting supplier:', err);
    }
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/suppliers/update/${editSupplier._id}`, editSupplier, {
        headers: {
          'Authorization': token, // Send token for authentication
          'Content-Type': 'application/json'
      }
      });
      const updatedSupplier = res.data;
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) => (supplier._id === updatedSupplier._id ? updatedSupplier : supplier))
      );
      setEditSupplier(null);
      toast.success("Supplier updated successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error updating supplier');
      console.error('Error updating supplier:', err);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ minWidth: "600px" }}>
      <h3>Manage Suppliers</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search suppliers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredSuppliers.length === 0 ? (
        <div>No suppliers found</div>
      ) : (
        <table className="table table-bordered" style={{ width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ minWidth: "150px" }}>Supplier Name</th>
              <th style={{ minWidth: "150px" }}>Email</th>
              <th style={{ minWidth: "150px" }}>Supply Products</th>
              <th style={{ minWidth: "150px" }}>quantity</th>
              <th style={{ minWidth: "150px" }}>Payment</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.email}</td>
                <td>{supplier.supplyProduct}</td>
                <td>{supplier.quantity}</td>
                <td>{supplier.payment}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(supplier)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supplier._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editSupplier && (
        <div className="edit-form mt-4" style={{ position: "fixed", left: "30%", top: "4rem", width: "50%", background: "#e3f2fd", padding: "1rem", zIndex: 1000 }}>
          <h4>Edit Supplier</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Supplier Name</label>
              <input
                type="text"
                className="form-control"
                value={editSupplier.supplierName}
                onChange={(e) => setEditSupplier({ ...editSupplier, supplierName: e.target.value })}
                required
              />
            </div>
           
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={editSupplier.email}
                onChange={(e) => setEditSupplier({ ...editSupplier, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={editSupplier.supplyProduct}
                onChange={(e) => setEditSupplier({ ...editSupplier, supplyProduct: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="number"
                className="form-control"
                value={editSupplier.quantity}
                onChange={(e) => setEditSupplier({ ...editSupplier, quantity: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">Update Supplier</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditSupplier(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageSuppliers;
