import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios'
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaReceipt } from 'react-icons/fa';

import LoadingScreen from '../components/loading/LoadingScreen';

function Cart() {
  const navigate = useNavigate();
  const [cartData,setCartData] = useState([])
  const [filteredCartData,setFilteredCartData] = useState([])
  const [salePriceTotal,setSalePriceTotal] = useState(0)
  const [proPriceTotal,setProPriceTotal] = useState(0)
  const [discountTotal,setDiscountTotal] = useState(0)
  const [notif,setNotif] = useState(true)
  const deliveryCharge = 30

  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state



const calculateTotalSalePrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item?.productId?.sale_rate * item?.qty ;
  });

  return totalSalePrice;
};
const calculateTotalProPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item?.productId?.price* item?.qty;
  });

  return totalSalePrice;
};
const calculateTotalDiscountPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item?.productId?.discount;
  });

  return totalSalePrice;
};

const fetchData = async()=>{

  try {

    const response = await axiosInstance.get(`/user/getcarts`);
    setCartData(response?.data?.data)

    
    const items = response?.data?.data?.item;
    const filteredItems = items.filter((obj)=>{

      return obj.productId.isAvailable !=false

    })
    setFilteredCartData(filteredCartData)

// Calculate the total sale price
const totalSalePrice = calculateTotalSalePrice(filteredItems);
   setSalePriceTotal(totalSalePrice)

  // Calculate the total  price
const totalProPrice = calculateTotalProPrice(filteredItems);
   setProPriceTotal(totalProPrice)
  //  console.log('total pr ',totalProPrice)

  // Calculate the total discount
const totalDiscount = calculateTotalDiscountPrice(filteredItems);
   setDiscountTotal(totalDiscount)

  } catch (error) {
    console.log(error)
  } finally {
    setLoadScreenState(false); // Set loading to false after data is fetched
}

}

useEffect(()=>{

  fetchData()

},[])



const handleQuantityChange = async (item, operation, index) => {
  let newQty = item?.qty;

  if (operation === 'increment' && item?.qty < item?.productId?.stock) {
    newQty += 1;
  } else if (operation === 'decrement' && item.qty > 1) {
    newQty -= 1;
  }

  // Optimistically update the UI
  const updatedCartData = { ...cartData };
  updatedCartData.item[index].qty = newQty;
  setCartData(updatedCartData);

  setLoadingIndex(index); // Set loading state

  try {
    const response = await axiosInstance.patch(`/user/updateQty`, { qty: newQty, productId: item?.productId?._id });

    // Fetch the updated cart data
   await fetchData();
  } catch (error) {
    console.log(error);

    // Revert the state change if the API call fails
    const revertedCartData = { ...cartData };
    revertedCartData.item[index].qty = item?.qty;
    setCartData(revertedCartData);
  } finally {
    setLoadingIndex(null); // Clear loading state
  }
};





  

  const handleRemoveItem =async (itemId) => {
   let urlQuery=`/user/removeFromCart/${itemId}`

   try {
    const response = await axiosInstance.patch(urlQuery);
    const updatedCartItems = cartData.item.filter((item) => item?._id !== itemId);
    const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + (item?.price * item?.qty), 0);
    setProPriceTotal(null)
    setSalePriceTotal(null)
    setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice
    });

    const filteredItems = updatedCartItems.filter((obj)=>{

      return obj.productId.isAvailable !=false

    })
   // Calculate the total sale price
   const totalSalePrice = calculateTotalSalePrice(filteredItems);
       setSalePriceTotal(totalSalePrice)
   
       // Calculate the total  price
   const totalProPrice = calculateTotalProPrice(filteredItems);
       setProPriceTotal(totalProPrice)

       setNotif(prev => !prev);

} catch (error) {
    console.error("Error removing item from wishlist:", error);
 
}
 
  };

   //

   const discount = 300;
   const deliveryCharges = 300;

  // const totalBeforeDiscount = subtotal;
  // const totalAfterDiscount = totalBeforeDiscount - discount + deliveryCharges;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <MiddleNav notification={notif} />
      
      {
loadScreenState ? (
  <LoadingScreen/>
)  : (

<div className="container my-5 flex-grow-1">
        <h1 className="text-success mb-4 text-center">
          <FaShoppingCart className="me-2" /> Your Cart
        </h1>
        
        {cartData?.item?.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-4">Your cart is empty</p>
            <Link to="/allproducts" className="btn btn-success btn-lg">
              <FaPlus className="me-2" />Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cartData?.item?.slice().reverse().map((item,index )=> (
                <div key={item?._id} className="card mb-3 border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-3 p-3">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.productId?.image[0]}`}
                        className="img-fluid rounded"
                        alt={item?.productId?.name}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title text-success">{item?.productId?.name}</h5>
                        {/* <p className="text-muted small">Microgreen</p> */}
                        <div className="d-flex align-items-center mb-3">
                          <p className="card-text fw-bold mb-0 me-3">₹{item?.productId?.sale_rate}</p>
                          <span className="text-muted text-decoration-line-through small me-2">₹{item?.productId?.price}</span>
                          <span className="bg-success-subtle">{item?.productId?.discount}% off</span>
                        </div>
                        <div className="d-flex align-items-center">



                          <div className="btn-group me-3" role="group">
                            <div>
{
item?.productId?.isAvailable ?(

  <>
    <button
    className="btn btn-outline-secondary"
    onClick={() => handleQuantityChange(item, 'decrement', index)}
    disabled={item.qty === 1 || loadingIndex === index}
  >
    {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <FaMinus />}
  </button>
  <button className="btn btn-outline-secondary" disabled style={{ color: 'darkgreen' }}>
    {item?.qty}
  </button>
  <button
    className="btn btn-outline-secondary"
    onClick={() => handleQuantityChange(item, 'increment', index)}
    disabled={loadingIndex === index}
  >
    {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <FaPlus />}
  </button>
  </>
) : 
(
  <div>
<p style={{color:'red',fontSize:'18px',fontWeight:'600'}} >unavailable</p>
    </div>
)

}
                            </div>


</div>



                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveItem(item?._id)}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success mb-4">
                    <FaReceipt className="me-2" />Order Summary
                  </h5>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹{proPriceTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount:</span>
                      <span className="text-success ">- ₹{proPriceTotal-salePriceTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Charges:</span>
                {salePriceTotal > 299 ? (
                  <span>
                    <span className='text-decoration-line-through me-2' >₹{deliveryCharge}</span>
                  <span className='text-success'>Free Delivery </span>
                  </span>
                ):(<span>₹{deliveryCharge}</span>
                ) }

                    </div>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>
                    ₹{salePriceTotal < 299 ? salePriceTotal + deliveryCharge : salePriceTotal}
                    </span>
                  </div>
                  {/* <Link to="/checkout" className="btn btn-success btn-lg w-100 mt-4" >
                    Proceed to Checkout
                  </Link> */}


                   <button className="btn btn-success btn-lg w-100 mt-4" onClick={() => navigate('/checkout')} 
                     disabled={salePriceTotal<80} >{salePriceTotal<80? 'Add above ₹80 to continue': 'Proceed to Checkout'} 
                     </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
)


      }
      
      
      <Footer />
    </div>
  );
}

export default Cart;