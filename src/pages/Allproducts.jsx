import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

// Dummy product data for demonstration
const dummyProducts = [
  { id: 1, name: 'CHARCOAL ENHANCED BAMBOO TOOTHBRUSH', imageUrl: 'https://img.freepik.com/premium-photo/eco-friendly-bamboo-toothbrush-pastel-background-zero-waste-life-without-plastic_223515-200.jpg?w=996', price: '120', quantity: '500' },
  { id: 2, name: 'BAMBOO TOOTHBRUSH [ white ]', imageUrl: 'https://img.freepik.com/free-photo/top-view-toothbrushes-towels_23-2148678027.jpg?w=826&t=st=1720514150~exp=1720514750~hmac=d12b18a24d3805634f531efeebf4641f623175b2449f1117084539d439e22e35', price: '150', quantity: '500' },
  { id: 3, name: 'BAMBOO TONQUE CLEANER', imageUrl: 'https://img.freepik.com/free-photo/eco-friendly-environment-bamboo-tube-straws_23-2148768567.jpg?t=st=1720514232~exp=1720517832~hmac=62cd94a2d5614c27c2c97a3235759bf284823b8b6df313938850f4dd238eb4fe&w=1060', price: '180', quantity: '500' },
  { id: 4, name: 'ECO-FRIENDLY COTTON BUDS', imageUrl: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996', price: '180', quantity: '500' },
];

const Allproducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
  
      setProducts(dummyProducts);
 
  }, []);

  return (
    <>
      <MiddleNav />
      <section className="products-section py-5">
        <Container>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h2>
          <Row>
            {products.map((item, index) => (
              <Col key={item._id} md={4} className="mb-4">
                <motion.div 
                  className="product-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                 
                 <Link to="/product" className="product-link">
                  <div className="product-image">
                     {/* <img src={`/uploads/${item.imageUrl}`} alt={item.name} className="img-fluid" /> */}
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
                    <Link to={`/wishlist/${item._id}`} className="btn btn-outline-success btn-sm">
                      <i className="fa-solid fa-heart"></i>
                    </Link>
                    <Link to={`/cart/${item._id}`} className="btn btn-success btn-sm">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </Link>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Allproducts;
