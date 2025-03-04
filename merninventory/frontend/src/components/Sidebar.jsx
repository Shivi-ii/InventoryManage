import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Sidebar = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSuppliersOpen, setIsSuppliersOpen] = useState(false); 
  const [isInventoryOpen, setIsInventoryOpen] = useState(false); 
  const [isSalesOpen, setIsSalesOpen]  = useState(false); 
  const [isEmployeesOpen,setIsEmployeesOpen] =  useState(false); 



  const toggleOrdersDropdown = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  const toggleSuppliersDropdown = () => {
    setIsSuppliersOpen(!isSuppliersOpen);
  };

  const toggleInventoryDropdown = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };
  const toggleSalesDropdown  = () => {
    setIsSalesOpen(!isSalesOpen);
  };
  
  const  toggleEmployeesDropdown = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  return (
    <div 
    className="p-3 vh-100 overflow-auto" 
    style={{ 
      background: 'linear-gradient(135deg,rgb(17, 38, 77), #2a5298)', 
      color: '#fff', 
      width: '250px',
    }}
  >
    <h4 className="text-center">Menu</h4>
    <ul className="nav flex-column">
      
      {/* Dashboard */}
      <li className="nav-item mb-3">
        <Link 
          to="/dashboard" 
          className="nav-link d-flex align-items-center text-white sidebar-item">
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </Link>
      </li>

      {/* Orders Dropdown */}
      <li className="nav-item mb-3">
        <button 
          className="nav-link d-flex align-items-center sidebar-item w-100 border-0" 
          onClick={() => setIsOrdersOpen(!isOrdersOpen)}
        >
          <i className="bi bi-receipt me-2"></i> Sales
          <i className={`bi ${isOrdersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </button>
        {isOrdersOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item mb-2">
              <Link to="/dashboard/orders/add" className="nav-link text-white">Add Sales</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/orders/view" className="nav-link text-white">View Sales</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Suppliers Dropdown */}
      <li className="nav-item mb-3">
        <button 
          className="nav-link d-flex align-items-center sidebar-item w-100 border-0" 
          onClick={() => setIsSuppliersOpen(!isSuppliersOpen)}
        >
          <i className="bi bi-truck me-2"></i> Suppliers
          <i className={`bi ${isSuppliersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </button>
        {isSuppliersOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item mb-2">
              <Link to="/dashboard/suppliers/add" className="nav-link text-white">Add Supplier</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/suppliers/manage" className="nav-link text-white">Manage Suppliers</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Inventory Dropdown */}
      <li className="nav-item mb-3">
        <button 
          className="nav-link d-flex align-items-center sidebar-item w-100 border-0" 
          onClick={() => setIsInventoryOpen(!isInventoryOpen)}
        >
          <i className="bi bi-boxes me-2"></i> Products
          <i className={`bi ${isInventoryOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </button>
        {isInventoryOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item mb-2">
              <Link to="/dashboard/inventory/add" className="nav-link text-white">Add Product</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/inventory/manage" className="nav-link text-white">Manage Product</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Employees Dropdown */}
      <li className="nav-item mb-3">
        <button 
          className="nav-link d-flex align-items-center sidebar-item w-100 border-0" 
          onClick={() => setIsEmployeesOpen(!isEmployeesOpen)}
        >
          <i className="bi bi-people me-2"></i> Employees
          <i className={`bi ${isEmployeesOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </button>
        {isEmployeesOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item mb-2">
              <Link to="/dashboard/employees/add" className="nav-link text-white">Add Employees</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/employees/manage" className="nav-link text-white">Manage Employees</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Settings */}
      
    </ul>
  </div>
  );
};

export default Sidebar;
