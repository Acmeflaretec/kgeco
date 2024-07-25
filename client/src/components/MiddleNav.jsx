import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './MiddleNav.css'; // Custom styles

function MiddleNav({notification}) {
  const cartItemCount = 3;
  const wishlistItemCount = 2;
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate a logged-in user
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();
  const [wishListData,setWishListData] = useState()
  const [cartData,setCartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
       // console.log(response.data.data)
        dispatch(setUserDetails(response.data.data));
      } catch (error) {
        console.log('errr', error);
        dispatch(clearUserDetails());
      }
    };
    fetchData();
  }, []);

let urlQuery = '';

useEffect(()=>{

  urlQuery=`/user/getcarts`

  const fetchData = async()=>{

    try {

      const response = await axiosInstance.get(urlQuery);
      setCartData(response?.data?.data?.item?.length)

    }catch(error){
      
    }
  }

  fetchData()
    },[notification])

  useEffect(()=>{
 
    
 
     const fetchData = async()=>{
 
       try {
 
         const response = await axiosInstance.get(`/user/getwishlist`);
         setWishListData(response?.data?.data?.length)
      
         
       } catch (error) {
         console.log(error)
       }
 
     }
 
 
     fetchData()
 
 
   },[notification])

  

  const logoutUser = () => {
    // Dispatch the clearUserDetails action to log out the user
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    window.location.reload();
    navigate('/')
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light middle-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="logo.png" className="logo" alt="Logo" />
        </Link>

        <div className="nav-actions mobile-action">
            <Link to={userDetails? '/cart' :'/login'} className="nav-icon-link" title="Cart">
              <i className="fas fa-shopping-cart"></i>
              { cartData > 0 && <span className="badge">{cartData}</span>}
            </Link>
            <Link to={userDetails? '/wishlist' :'/login'} className="nav-icon-link" title="Wishlist">
              <i className="fas fa-heart"></i>
              {wishListData > 0 && <span className="badge">{wishListData}</span>}
            </Link>
          
          </div>

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
          <div className="nav-actions pc-action">
            <Link to={userDetails? '/cart' :'/login'} className="nav-icon-link" title="Cart">
              <i className="fas fa-shopping-cart"></i>
              { cartData > 0 && <span className="badge">{cartData}</span>}
            </Link>
            <Link to={userDetails? '/wishlist' :'/login'} className="nav-icon-link" title="Wishlist">
              <i className="fas fa-heart"></i>
              {wishListData > 0 && <span className="badge">{wishListData}</span>}
            </Link>
            {userDetails ? (
              <div className="dropdown">
                <button className=" profile-icon" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user text-white"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item" to={userDetails? '/profile' :'/login'}>Profile</Link></li>
                  <li><button className="dropdown-item" onClick={logoutUser}  >Logout</button></li>
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
