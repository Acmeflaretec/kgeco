import React from 'react';
import { motion } from 'framer-motion';
import './Banner.css';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay"></div>
      <div className="container">
        <div className="row align-items-center">
          <motion.div 
            className="col-lg-6 banner-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="banner-title">
              Eco-Friendly Living,<br />
              <span className="highlight">Sustainable Future</span>
            </h1>
            <p className="banner-subtitle">
              Join us in creating a culture of sustainability with our eco-friendly products
            </p>
           <Link to={'/allproducts'}>
              <motion.button 
                className="btn btn-primary btn-lg mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products
              </motion.button>
           </Link>
          </motion.div>
          <motion.div
            className="col-lg-6 banner-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img src="https://img.freepik.com/premium-photo/zero-waste-selfcare-products-top-view-bamboo-toothbrush-body-cream-soap-travel-bottle_377884-87.jpg?w=900" alt="Eco-friendly products" className="img-fluid banner-image" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;