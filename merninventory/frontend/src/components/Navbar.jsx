import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage (or cookies, depending on your implementation)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    toast.info('Logged out successfully! 🚪', { position: 'top-right' });
    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark" 
      style={{ 
        background: 'linear-gradient(135deg,rgb(129, 159, 223),rgb(42, 117, 152))', // Match the sidebar gradient
        color: '#fff', // Ensure text is white
        width: "1100px",
        marginLeft:"50px",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/dashboard">Manage Your Expenses</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-link nav-link text-white" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;