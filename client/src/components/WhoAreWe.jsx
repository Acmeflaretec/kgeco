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
              We are a dedicated team on a mission to make the world a greener place. Our goal is to provide eco-friendly products that promote a culture of sustainability and environmental responsibility. From oral care to home essentials, each of our products is designed with the planet in mind.
            </p>
            <p className="section-text">
              Join us in our journey towards a more sustainable future. Together, we can make a significant impact on our environment by choosing products that are kind to the Earth.
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
              <img src="https://img.freepik.com/free-photo/bamboo-toothbrushes-soap-top-view_23-2148645564.jpg?t=st=1720514293~exp=1720517893~hmac=f3f8a9bbc73ea2a74f448b09941224c7cc0a9bb2eaf8cb2e39420ca37210b8f0&w=996" alt="Eco-friendly products" className="img-fluid rounded" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhoAreWe;