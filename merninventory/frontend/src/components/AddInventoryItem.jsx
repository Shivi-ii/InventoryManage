import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInventoryItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(costPrice) <= 0 || Number(sellingPrice) <= 0) {
      toast.error("costPrice and sellingPrice must be positive values", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const newItem = { name, quantity: Number(quantity), costPrice: Number(costPrice), sellingPrice: Number(sellingPrice) };
      console.log("Sending Data to Backend:", newItem);
      await axios.post("http://localhost:5000/api/inventory/add", newItem, {
        headers: { 
          "Authorization": token, // Attach token for authentication
          "Content-Type": "application/json" 
      }
      });
  
      toast.success("Item added successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
  
      setName("");
      setQuantity("");
      setCostPrice("");
      setSellingPrice("")
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      } else {
        toast.error("Failed to add item. Please try again.", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Item Name</label>
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
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">cost Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sellingPrice" className="form-label">selling Price</label>
          <input
            type="number"
            className="form-control"
            id="sellingPrice"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>

        {/* Display Error Message */}
      </form>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default AddInventoryItem;
