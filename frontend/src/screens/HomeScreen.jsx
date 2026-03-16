import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-branding">
          <h1>HVAC Services Marketplace</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          {userInfo ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              {userInfo.role === 'seller' && (
                <li><Link to="/seller/dashboard">Dashboard</Link></li>
              )}
              {userInfo.role === 'admin' && (
                <li><Link to="/admin/users">Admin</Link></li>
              )}
              {userInfo.role !== 'seller' && userInfo.role !== 'admin' && (
                <li><Link to="/apply">Become a Seller</Link></li>
              )}
            </>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="home-hero">
        <h2>Welcome to HVAC Services Marketplace</h2>
        <p>Find trusted HVAC professionals in your area</p>
        {!userInfo ? (
          <div className="home-ctas">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/signin" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        ) : (
          <p>Welcome back, {userInfo.username}!</p>
        )}
      </div>

      <div className="services-section">
        <h3>Browse HVAC Services</h3>
        <p>Explore and hire trusted HVAC professionals</p>
        <Link to="/services" className="btn btn-primary">
          View Services
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
