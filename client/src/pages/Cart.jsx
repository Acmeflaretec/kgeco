import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaReceipt } from 'react-icons/fa';

function Cart() {
  const initialCartItems = [
    { id: 1, name: 'CHARCOAL ENHANCED BAMBOO TOOTHBRUSH', imageUrl: 'https://img.freepik.com/premium-photo/eco-friendly-bamboo-toothbrush-pastel-background-zero-waste-life-without-plastic_223515-200.jpg?w=996', price: '120', quantity: '1' },
    { id: 2, name: 'BAMBOO TOOTHBRUSH [ white ]', imageUrl: 'https://img.freepik.com/free-photo/top-view-toothbrushes-towels_23-2148678027.jpg?w=826&t=st=1720514150~exp=1720514750~hmac=d12b18a24d3805634f531efeebf4641f623175b2449f1117084539d439e22e35', price: '150', quantity: '2' },
    { id: 3, name: 'BAMBOO TONQUE CLEANER', imageUrl: 'https://img.freepik.com/free-photo/eco-friendly-environment-bamboo-tube-straws_23-2148768567.jpg?t=st=1720514232~exp=1720517832~hmac=62cd94a2d5614c27c2c97a3235759bf284823b8b6df313938850f4dd238eb4fe&w=1060', price: '180', quantity: '1' },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (itemId, operation) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity:
                operation === 'increment'
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = itemId => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== itemId)
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = 300;
  const deliveryCharges = 300;

  const totalBeforeDiscount = subtotal;
  const totalAfterDiscount = totalBeforeDiscount - discount + deliveryCharges;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <MiddleNav />
      
      <div className="container my-5 flex-grow-1">
        <h1 className="text-success mb-4 text-center">
          <FaShoppingCart className="me-2" /> Your Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-4">Your cart is empty</p>
            <Link to="/allproducts" className="btn btn-success btn-lg">
              <FaPlus className="me-2" />Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3 border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-3 p-3">
                      <img
                        src={item.imageUrl}
                        className="img-fluid rounded"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title text-success">{item.name}</h5>
                        {/* <p className="text-muted small">Microgreen</p> */}
                        <div className="d-flex align-items-center mb-3">
                          <p className="card-text fw-bold mb-0 me-3">₹{item.price}</p>
                          <span className="text-muted text-decoration-line-through small me-2">₹999</span>
                          <span className="bg-success-subtle">70% off</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="btn-group me-3" role="group">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, 'decrement')}
                              disabled={item.quantity === 1}
                            >
                              <FaMinus />
                            </button>
                            <button className="btn btn-outline-secondary" disabled>
                              {item.quantity}
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, 'increment')}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveItem(item.id)}
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
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount:</span>
                      <span className="text-success">-₹{discount.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Charges:</span>
                      <span>₹{deliveryCharges.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>₹{totalAfterDiscount.toFixed(2)}</span>
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