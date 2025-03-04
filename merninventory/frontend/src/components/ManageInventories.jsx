import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageInventories = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const token = localStorage.getItem('token'); 

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/inventory', {
        headers: {
          'Authorization': token // Send token in the request headers
      }
      });
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error fetching inventory items');
      console.error('Error fetching inventory items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`,{
        headers: {
          'Authorization': token // Send token for authentication
      }
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Optimistic update
      toast.error("Order deleted successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });
    } catch (err) {
      setError('Error deleting item');
      console.error('Error deleting item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log(editItem)
      const res = await axios.put(`http://localhost:5000/api/inventory/${editItem._id}`, editItem, {
        headers: {
          'Authorization': token, // Send token for authentication
          'Content-Type': 'application/json'
      }
      });
      const updatedItem = res.data;

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      ); // Optimistic update
      setEditItem(null);
      toast.success("Item updated successfully!", { position: "top-center", hideProgressBar: true, autoClose: 2000 });

    } catch (err) {
      setError('Error updating item');
      console.error('Error updating item:', err);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ minWidth: "600px" }} >
      <h3>Manage Inventory</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div>No items found</div>
      ) : (
        <table className="table table-bordered" style={{ width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ minWidth: "150px" }}>Name</th>
              <th style={{ minWidth: "150px" }}>Quantity</th>
              <th style={{ minWidth: "150px" }}>Cost Price</th>
              <th style={{ minWidth: "150px" }}>sell Price</th>
              <th style={{ minWidth: "150px" }}>profit</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.costPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.profit}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editItem && (
        <div className="edit-form mt-4" style={{ color: "white", position: "fixed", left: "30%", top: "4rem", width: "50%", background: "#e3f2fd", padding: "1rem", zIndex: 1000 }}>
          <h4>Edit Item</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="editName" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="editName"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editQuantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="editQuantity"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({ ...editItem, quantity: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editCostPrice" className="form-label">Cost Price</label>
              <input
                type="number"
                className="form-control"
                id="editPrice"
                value={editItem.costPrice}
                onChange={(e) =>
                  setEditItem({ ...editItem, costPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editSellingPrice" className="form-label">Selling Price</label>
              <input
                type="number"
                className="form-control"
                id="editPrice"
                value={editItem.sellingPrice}
                onChange={(e) =>
                  setEditItem({ ...editItem, sellingPrice: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Update Item</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditItem(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageInventories;
