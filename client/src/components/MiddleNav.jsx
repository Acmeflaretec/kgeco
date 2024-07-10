import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './MiddleNav.css'; // Custom styles

function MiddleNav() {
  const cartItemCount = 3;
  const wishlistItemCount = 2;
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate a logged-in user

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light middle-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="logo.png" className="logo" alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allproducts">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">Contact</Link>
            </li>
          </ul>
          <div className="nav-actions">
            <Link to="/cart" className="nav-icon-link" title="Cart">
              <i className="fas fa-shopping-cart"></i>
              {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
            </Link>
            <Link to="/wishlist" className="nav-icon-link" title="Wishlist">
              <i className="fas fa-heart"></i>
              {wishlistItemCount > 0 && <span className="badge">{wishlistItemCount}</span>}
            </Link>
            {isLoggedIn ? (
              <div className="dropdown">
                <button className=" profile-icon" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user text-white"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary login-btn">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MiddleNav;
