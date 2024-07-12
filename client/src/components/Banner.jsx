import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import { motion } from 'framer-motion';
import './Banner.css';
import { Link } from 'react-router-dom';

function Banner() {

  const [banner,setBanner] = useState([])

  
    useEffect(()=>{
  
      
  
      const fetchData = async()=>{
  
        try {
  
          const response = await axiosInstance.get(`/banners`);
          setBanner(response.data.data)
          console.log(response.data.data)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
  
      fetchData()
  
  
    },[])
  

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
              {banner[0]?.title}<br />
              <span className="highlight">{banner[0]?.subtitle}</span>
            </h1>
            <p className="banner-subtitle">
             {banner[0]?.description}
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
            <img
src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${banner[0]?.image}`}
              alt="Eco-friendly products" className="img-fluid banner-image" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;