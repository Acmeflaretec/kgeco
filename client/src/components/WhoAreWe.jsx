import React from 'react';
import { motion } from 'framer-motion';
import './WhoAreWe.css'; // We'll create this file for custom styles
import { Link } from 'react-router-dom';

const WhoAreWe = () => {
  return (
    <section className="who-are-we">
      <div className="container">
        <div className="row align-items-center">
          <motion.div 
            className="col-lg-6 content-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Who Are We?</h2>
            <div className="green-line"></div>
            <p className="section-text">
            Eco-friendly solutions are essential for our future as plastic pollution threatens our planet. Our business provides a wide range of eco-products, available online and offline, revolutionizing personal care and daily essentials with sustainable alternatives. By creating a hub for all eco-friendly products, we address challenges like time-consuming choices and the lack of affordable, quality items. Starting in India and expanding across world, our goal is to reduce plastic waste and promote sustainable living globally.
                        </p>
         
           <Link to={'/about'}>
                <motion.button 
                  className="btn btn-primary learn-more-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                </motion.button>
           </Link>
          </motion.div>
          <motion.div 
            className="col-lg-6 image-col"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-wrapper">
              <img src="who.jpg" alt="Eco-friendly products" className="img-fluid rounded" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhoAreWe;