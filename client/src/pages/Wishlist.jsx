import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'CHARCOAL ENHANCED BAMBOO TOOTHBRUSH', imageUrl: 'https://img.freepik.com/premium-photo/eco-friendly-bamboo-toothbrush-pastel-background-zero-waste-life-without-plastic_223515-200.jpg?w=996', price: '120', quantity: '500' },
    { id: 2, name: 'BAMBOO TOOTHBRUSH [ white ]', imageUrl: 'https://img.freepik.com/free-photo/top-view-toothbrushes-towels_23-2148678027.jpg?w=826&t=st=1720514150~exp=1720514750~hmac=d12b18a24d3805634f531efeebf4641f623175b2449f1117084539d439e22e35', price: '150', quantity: '500' },
    { id: 3, name: 'BAMBOO TONQUE CLEANER', imageUrl: 'https://img.freepik.com/free-photo/eco-friendly-environment-bamboo-tube-straws_23-2148768567.jpg?t=st=1720514232~exp=1720517832~hmac=62cd94a2d5614c27c2c97a3235759bf284823b8b6df313938850f4dd238eb4fe&w=1060', price: '180', quantity: '500' },
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    const updatedWishlistItems = wishlistItems.filter((item) => item._id !== itemId);
    setWishlistItems(updatedWishlistItems);
  };

  const handleAddToCart = (item) => {
    // Implement your logic to add the item to the cart here
    console.log('Adding to cart:', item);
  };

  return (
    <>
      <MiddleNav />

      <div className="container py-5">
        <motion.h2
          className="text-center mb-4 section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Wishlist
        </motion.h2>
        {wishlistItems.length === 0 ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center">Your wishlist is empty.</p>
            <Link to="/allproducts">
              <button className="btn btn-success">
                <i className="fas fa-plus me-2"></i>Add Items
              </button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {wishlistItems.map((item) => (
              <motion.div
                key={item._id}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="product-card">
                <Link to="/product" className="product-link">
                  <div className="product-image">
                    <img src={item.imageUrl} alt={item.name} className="img-fluid" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{item.name}</h3>
                    <div className="price-info">
                      <span className="current-price">₹{item.price}</span>
                      <span className="original-price">₹999</span>
                      <span className="discount-badge">70% off</span>
                    </div>
                    {/* <p className="product-quantity">{item.quantity} gm</p> */}
                  </div>
                </Link>
                  <div className="product-actions">
                    <motion.button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Remove
                    </motion.button>
                    <Link to="/cart">
                      <motion.button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAddToCart(item)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Add to Cart
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
