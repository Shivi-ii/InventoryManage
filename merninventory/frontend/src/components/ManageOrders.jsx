import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [editOrder, setEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const token = localStorage.getItem('token'); 

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
            'Authorization': token // Send token in the request headers
        }
    });      
    setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/delete/${id}`, {
        headers: {
            'Authorization': token // Send token for authentication
        }
    });      
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      toast.error("Order deleted successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error deleting order');
      console.error('Error deleting order:', err);
    }
  };

  const handleEdit = (order) => {
    setEditOrder(order);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/update/${editOrder._id}`, editOrder, {
        headers: {
          'Authorization': token, // Send token for authentication
          'Content-Type': 'application/json'
      }
      });
      const updatedOrder = res.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
      setEditOrder(null);
      toast.success("Order updated successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error updating order');
      console.error('Error updating order:', err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ minWidth: "600px" }}>
      <h3>Manage Orders</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredOrders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        <table className="table table-bordered" style={{ width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ minWidth: "150px" }}>Custome Name</th>
              <th style={{ minWidth: "150px" }}>Product Name</th>
              <th style={{ minWidth: "150px" }}>Quantity</th>
              <th style={{ minWidth: "150px" }}>total Cost Price</th>
              <th style={{ minWidth: "150px" }}>total Selling Price</th>
              <th style={{ minWidth: "150px" }}>Profit</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.totalCostPrice}</td>
                <td>{order.totalSellingPrice}</td>
                <td>{order.totalProfit}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(order)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editOrder && (
        <div className="edit-form mt-4" style={{ position: "fixed", left: "30%", top: "4rem", width: "50%", background: "#e3f2fd", padding: "1rem", zIndex: 1000 }}>
          <h4>Edit Order</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={editOrder.customerName}
                onChange={(e) => setEditOrder({ ...editOrder, customerName: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={editOrder.productName}
                onChange={(e) => setEditOrder({ ...editOrder, productName: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={editOrder.quantity}
                onChange={(e) => setEditOrder({ ...editOrder, quantity: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Update Order</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditOrder(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageOrders;
