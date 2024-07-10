import React from 'react';
import { motion } from 'framer-motion';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: 'leaf',
      title: 'Eco-Friendly Products',
      description: 'Our products are designed with the environment in mind, using sustainable materials and eco-friendly practices.',
    },
    {
      icon: 'users',
      title: 'Community Driven',
      description: 'We are committed to building a community that values sustainability and supports eco-friendly living.',
    },
    {
      icon: 'award',
      title: 'High Quality',
      description: 'Our products are made to the highest standards, ensuring you receive durable and reliable items that you can trust.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="why-choose-us">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div 
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} className="col-lg-4 col-md-6" variants={itemVariants}>
              <div className="reason-card">
                <div className="icon-wrapper">
                  <i className={`fas fa-${reason.icon}`}></i>
                </div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;