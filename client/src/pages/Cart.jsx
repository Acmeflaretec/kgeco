import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaReceipt } from 'react-icons/fa';

function Cart() {

  const [cartData,setCartData] = useState([])
  const [salePriceTotal,setSalePriceTotal] = useState(0)
  const [proPriceTotal,setProPriceTotal] = useState(0)
  const [discountTotal,setDiscountTotal] = useState(0)
  const [notif,setNotif] = useState(true)


const calculateTotalSalePrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.sale_rate * item.qty ;
  });

  return totalSalePrice;
};
const calculateTotalProPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.price* item.qty;
  });

  return totalSalePrice;
};
const calculateTotalDiscountPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.discount;
  });

  return totalSalePrice;
};

const fetchData = async()=>{

  try {

    const response = await axiosInstance.get(`/user/getcarts`);
    setCartData(response.data.data)
    console.log('cart details array',response.data.data)
    //console.log('fetch qty ',response.data.data.item[0].qty)
    const items = response.data.data.item;

// Calculate the total sale price
const totalSalePrice = calculateTotalSalePrice(items);
   setSalePriceTotal(totalSalePrice)

  // Calculate the total  price
const totalProPrice = calculateTotalProPrice(items);
   setProPriceTotal(totalProPrice)
   console.log('total pr ',totalProPrice)

  // Calculate the total discount
const totalDiscount = calculateTotalDiscountPrice(items);
   setDiscountTotal(totalDiscount)

  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{

  fetchData()

},[])



 

  const handleQuantityChange =async (item, operation,index) => {
let QtyApi = item.qty
if(operation==='increment'){
  QtyApi +=1
}else if (operation==='decrement'){
  QtyApi -=1
}
try {
   

if(item.qty <=  item.productId.stock && operation==='increment'){
  const response = await axiosInstance.patch(`/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })
 
  setProPriceTotal(null)
  setSalePriceTotal(null)


}else if(item.qty>1 && operation==='decrement'){
  const response = await axiosInstance.patch(`/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })

  setProPriceTotal(null)
    setSalePriceTotal(null)

}

  } catch (error) {
   console.log(error)
  }

  fetchData()
 }




  

  const handleRemoveItem =async (itemId) => {
   console.log('cart id ',itemId)
   let urlQuery=`/user/removeFromCart/${itemId}`


   try {
    const response = await axiosInstance.patch(urlQuery);
    const updatedCartItems = cartData.item.filter((item) => item._id !== itemId);
    const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setProPriceTotal(null)
    setSalePriceTotal(null)
    setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice
    });
   // Calculate the total sale price
   const totalSalePrice = calculateTotalSalePrice(updatedCartItems);
   console.log(totalSalePrice)
       setSalePriceTotal(totalSalePrice)
   
       // Calculate the total  price
   const totalProPrice = calculateTotalProPrice(updatedCartItems);
   console.log(totalProPrice)
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
              {cartData?.item?.map((item,index )=> (
                <div key={item._id} className="card mb-3 border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-3 p-3">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item.productId.image[0]}`}
                        className="img-fluid rounded"
                        alt={item.productId.name}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title text-success">{item.productId.name}</h5>
                        {/* <p className="text-muted small">Microgreen</p> */}
                        <div className="d-flex align-items-center mb-3">
                          <p className="card-text fw-bold mb-0 me-3">₹{item.productId.sale_rate}</p>
                          <span className="text-muted text-decoration-line-through small me-2">₹{item.productId.price}</span>
                          <span className="bg-success-subtle">{item.productId.discount}% off</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="btn-group me-3" role="group">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item, 'decrement',index)}
                              disabled={item.qty === 1}
                            >
                              <FaMinus />
                            </button>
                            <button className="btn btn-outline-secondary" disabled>
                              {item.qty}
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item, 'increment',index )}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveItem(item._id)}
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
                      <span className="text-success">₹{proPriceTotal-salePriceTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Charges:</span>
                      <span>₹300</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>₹{salePriceTotal}</span>
                  </div>
                  <Link to="/checkout" className="btn btn-success btn-lg w-100 mt-4">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Cart;