import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  // Validation functions
  const validateUsername = (username) => /^[A-Za-z]+$/.test(username); // Only letters
  const validatePassword = (password) => /\d{5,}/.test(password); // At least five numbers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email format

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect logged-in users
    }
  }, [token, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateUsername(username)) {
      validationErrors.username = 'Username should contain only letters.';
    }

    if (!validatePassword(password)) {
      validationErrors.password = 'Password must have at least five numbers.';
    }

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password, username });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        toast.success('Account created successfully! 🎉', { position: 'top-right' });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Signup failed! ❌', { position: 'top-right' });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Sign up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
