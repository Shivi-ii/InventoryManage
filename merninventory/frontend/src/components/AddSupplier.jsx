import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddSupplier = () => {
  // State to manage form data
  const [supplier, setSupplier] = useState({
    supplierName: '',
    email: '',
    supplyProduct: '',
    quantity: '',
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Number(supplier.quantity)<=0){
      toast.error("quantity must be greater than 0", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      return
    }
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Sending data to the backend
      await axios.post('http://localhost:5000/api/suppliers/add', supplier, {
        headers: { 
          "Authorization": token, // Attach token for authentication
          "Content-Type": "application/json" 
      }
      });
        toast.success("supplier added successfully!", { position: "top-center",hideProgressBar: true, autoClose: 2000 });
      setSupplier({
        supplierName: '',
        email: '',
        supplyProduct: '',
        quantity: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Error adding supplier', { position: "top-center",hideProgressBar: true, autoClose: 2000 });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplierName}
            onChange={(e) => setSupplier({ ...supplier, supplierName: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={supplier.email}
            onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Supply Product</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplyProduct}
            onChange={(e) => setSupplier({ ...supplier, supplyProduct: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">quantity</label>
          <input
            type="number"
            className="form-control"
            value={supplier.quantity}
            onChange={(e) => setSupplier({ ...supplier, quantity: e.target.value })}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Supplier</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddSupplier;
