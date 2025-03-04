import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
  });


  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    e.preventDefault();
    const checkProductResponse = await fetch(`http://localhost:5000/api/inventory/product/${order.productName}`, {
      method: "GET",
      headers: {
        "Authorization": token,  // Send token in request
        "Content-Type": "application/json"
      }
    });    
    const productExists = await checkProductResponse.json();

    if (!productExists.exists) {
      toast.error("You don't sell this product! if you do please add it in items", {position: "top-center", hideProgressBar: true, autoClose: 2000 });
      return;
    }

    if (order.quantity < 0 ) {
      toast.error("Quantity must be positive value", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        toast.success("Order added successfully!", { position: "top-center",hideProgressBar: true, autoClose: 2000 });
        setOrder({ customerName: '', productName: '', quantity: ''});
      } else {
        toast.error("Failed to save order", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Server error! Please try again.", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Sales</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={order.productName}
            onChange={(e) => setOrder({ ...order, productName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Sale</button>
      </form>
        <ToastContainer />
    </div>
  );
};

export default AddOrder;
