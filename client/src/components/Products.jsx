import React,{useEffect,useState} from 'react';
import axiosInstance from '../axios'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import './Products.css';

function Products({setNotification}) {
const [products,setProducts] = useState([])
const [wishlistItems, setWishlistItems] = useState([]);
const [cartItems, setCartItems] = useState([]);
const navigate = useNavigate();
const userDetails = useSelector(state => state?.userDetails);

const [loading, setLoading] = useState({}); // Add loading state

const fetchProducts = async()=>{

try {
  const response = await axiosInstance.get(`/products?page=1&limit=8&sortField=createdAt&sortOrder=desc`)
  setProducts(response?.data?.data)
  const wishlistResponse = await axiosInstance.get('/user/getwishlist');
  setWishlistItems(wishlistResponse?.data?.data);
  const cartResponse = await axiosInstance.get('/user/getcarts');
  setCartItems(cartResponse?.data?.data?.item);
} catch (error) {
  console.log(error)
}

}

useEffect(()=>{
fetchProducts()
},[])

const fetchCart = async () => {
  try {
    const cartResponse = await axiosInstance.get('/user/getcarts');
    setCartItems(cartResponse?.data?.data?.item);
  
  } catch (error) {
    console.log(error);
  }
};

const fetchWishlist = async () => {
  try {
    const wishlistResponse = await axiosInstance.get('/user/getwishlist');
    setWishlistItems(wishlistResponse?.data?.data);
  } catch (error) {
    console.log(error);
  }
};


const addWishlist = async (proId) => {

  if(!userDetails){
    navigate('/login')
    
        }else{


          try {
            
            const response = await axiosInstance.patch(`/user/addToWishlist/${proId}`);
            await fetchWishlist();
             
            setNotification(prev => !prev);
          } catch (error) {
            console.log(error)
          
          }
        }



}

const removeWishlist = async (proId) => {
  if(!userDetails){
    navigate('/login')
    
        }else{
          try {
            
            const response = await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
            await fetchWishlist();
            setNotification(prev => !prev);
      //console.log(response)
          } catch (error) {
            console.log(error)
          }
        }
  

}

// const addCart = async (proId) => {
//   if(!userDetails){
//     navigate('/login')
    
//         }else{
//           try {
            
//             const response = await axiosInstance.patch(`/user/addToCart/${proId}`);
//           await  fetchCart()
//           setNotification(prev => !prev);
          
//           } catch (error) {
//             console.log(error)
          
//           }
//         }

  
//     }
    
const addCart = async (proId) => {
  if (!userDetails) {
    navigate('/login');
  } else {
    setLoading(prev => ({ ...prev, [proId]: true })); // Set loading state
    try {
      const response = await axiosInstance.patch(`/user/addToCart/${proId}`);
      await fetchCart();
      setNotification(prev => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(prev => ({ ...prev, [proId]: false })); // Reset loading state
      await fetchCart();
    }
  }
};



    // const isInWishlist = (productId) => {
    //   return wishlistItems?.some((item) => item?._id === productId);
    // };

    const isInWishlist = (productId) => {
      if (wishlistItems === undefined) {
        return null;
      }
      return wishlistItems?.some((item) => item?._id === productId);
    };
    const isInCart = (productId) => {
      if (cartItems === undefined) {
        return null;
      }
      return  cartItems.some((item) => item?.productId?._id === productId);
    };

    // const isInCart = (productId) => {
    //   return cartItems.some((item) => item?.productId?._id === productId);
    // };

    const truncateText = (text, wordLimit) => {
      const words = text.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return text;
    };

  return (
    <section className="products-section">
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
                <Link to={`/product/${item?._id}`} className="product-link">
                  <div className="product-image">
                    <img src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.image[0]}`} alt={item?.name} className="img-fluid" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{item?.name}</h3>
                    <div className="price-info">
                      <span className="current-price">₹{item?.sale_rate}</span>
                      <span className="original-price">₹{item?.price}</span>
                      <span className="discount-badge">{item?.discount}% off</span>
                    </div>
                    <p className="product-quantity"> {truncateText(item?.subheading, 20)} </p>
                  </div>
                </Link>
                <div className="product-actions">
                  {
 ! isInWishlist(item?._id) ?  <button className="btn btn-outline-success btn-sm"  onClick={ ()=> addWishlist(item?._id)}>
<i className="fa-solid fa-heart"></i>
</button>   :
 <button className="btn btn-outline-danger btn-sm" onClick={()=> removeWishlist(item?._id)}>
 <i className="fa-solid fa-heart"></i>
</button>

                  }
                 
                 {
                   ! isInCart(item?._id) ?  (
              
                <button className="btn btn-success btn-sm" onClick={() => addCart(item?._id)} disabled={loading[item?._id]}>
                      {loading[item?._id] ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart"></i> Add to Cart
                        </>
                      )}
                    </button>
                ) :
            (    <button className="btn btn-warning btn-sm" onClick={()=> navigate('/cart')}>
                <i className="fas fa-shopping-cart"></i> Go to Cart
              </button> )
                 }


                  

                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/allproducts" className="btn btn-success btn-lg">
            Load More
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

export default Products;