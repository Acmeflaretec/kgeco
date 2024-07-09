import React, { useState } from 'react';
import { FaRegTrashAlt, FaLock, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState('razorpay');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'ECO-FRIENDLY COTTON BUDS',
      image: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996',
      price: 1999,
      quantity: 1,
    }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 100;
    const tax = 0.1 * subtotal;
    return subtotal + deliveryFee + tax;
  };

  const removeProduct = (id) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );
  };

  const placeOrder = () => {
    Swal.fire({
      title: 'Success',
      text: 'Your order has been placed!',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000
    });
    navigate('/');
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addressWithId = { ...newAddress, id: Date.now() };
    setAddresses([...addresses, addressWithId]);
    setSelectedAddress(addressWithId);
    setShowAddressModal(false);
    setNewAddress({ name: '', street: '', city: '', state: '', pincode: '', phone: '' });
  };

  return (
    <div className="bg-light min-vh-100">
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none">
              <img src="logo.png" className="img-fluid" width={120} alt="Logo" />
            </Link>
            
            <div className="text-success">
              <FaLock className="me-2" />
              <span className="fw-bold">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container my-5">
        <div className="row g-5">
          <div className="col-lg-8">
            {/* <div className="progress mb-4" style={{height: "8px"}}>
              <div 
                className="progress-bar bg-success" 
                role="progressbar" 
                style={{ width: `${(currentStep / 3) * 100}%` }} 
                aria-valuenow={(currentStep / 3) * 100} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div> */}

            {currentStep === 1 && (
              <section className="card shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h5 className="mb-0 text-success">1. Shipping Address</h5>
                </div>
                <div className="card-body">
                  {addresses.length === 0 ? (
                    <div className="text-center py-5">
                      <FaPlus className="text-muted mb-3" size={48} />
                      <h5 className="mb-3">No addresses found</h5>
                      <button className="btn btn-success" onClick={() => setShowAddressModal(true)}>
                        Add New Address
                      </button>
                    </div>
                  ) : (
                    <div className="row g-3">
                      {addresses.map(address => (
                        <div key={address.id} className="col-md-6">
                          <div className={`border rounded p-3 h-100 ${selectedAddress === address ? 'border-success' : ''}`}>
                            <p className="mb-1"><strong>{address.name}</strong></p>
                            <p className="mb-1">{address.street}</p>
                            <p className="mb-1">{address.city}, {address.state} {address.pincode}</p>
                            <p className="mb-3">Phone: {address.phone}</p>
                            <button 
                              className={`btn ${selectedAddress === address ? 'btn-success' : 'btn-outline-success'} w-100`}
                              onClick={() => setSelectedAddress(address)}
                            >
                              {selectedAddress === address ? 'Selected' : 'Select This Address'}
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100 d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-success" onClick={() => setShowAddressModal(true)}>
                            <FaPlus className="me-2" />
                            Add New Address
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedAddress && (
                    <div className="mt-4 text-end">
                      <button className="btn btn-success" onClick={() => setCurrentStep(2)}>Continue to Review</button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="card shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h5 className="mb-0 text-success">2. Review Items and Shipping</h5>
                </div>
                <div className="card-body">
                  {products.map(product => (
                    <div key={product.id} className="row mb-4 align-items-center">
                      <div className="col-md-3">
                        <img src={product.image} alt={product.name} className="img-fluid rounded" />
                      </div>
                      <div className="col-md-6">
                        <h6 className="fw-bold mb-1">{product.name}</h6>
                        {/* <p className="text-muted small mb-2">Microgreen</p> */}
                        <div className="d-flex align-items-center">
                          <span className="fw-bold me-2">₹{product.price}</span>
                          <span className="text-muted text-decoration-line-through small me-2">₹999</span>
                          <span className="bg-success-subtle text-success px-2 py-1 rounded-pill">70% off</span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="input-group">
                          <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(product.id, product.quantity - 1)} disabled={product.quantity === 1}>-</button>
                          <input type="text" className="form-control text-center" value={product.quantity} readOnly />
                          <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button>
                        </div>
                        <button className="btn btn-link text-danger mt-2" onClick={() => removeProduct(product.id)}>
                          <FaRegTrashAlt /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary" onClick={() => setCurrentStep(1)}>Back</button>
                    <button className="btn btn-success" onClick={() => setCurrentStep(3)}>Continue to Payment</button>
                  </div>
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="card shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h5 className="mb-0 text-success">3. Payment Options</h5>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3 p-3 border rounded">
                    <input className="form-check-input" type="radio" name="paymentOption" id="razorpayOption" value="razorpay" checked={paymentOption === 'razorpay'} onChange={() => setPaymentOption('razorpay')} />
                    <label className="form-check-label" htmlFor="razorpayOption">
                      <span className="fw-bold d-block mb-1">Online Payment</span>
                      <span className="text-muted small">Pay securely with your credit/debit card or net banking</span>
                    </label>
                  </div>
                  <div className="form-check mb-3 p-3 border rounded">
                    <input className="form-check-input" type="radio" name="paymentOption" id="codOption" value="cod" checked={paymentOption === 'cod'} onChange={() => setPaymentOption('cod')} />
                    <label className="form-check-label" htmlFor="codOption">
                      <span className="fw-bold d-block mb-1">Cash on Delivery</span>
                      <span className="text-muted small">Pay when your order is delivered</span>
                    </label>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary" onClick={() => setCurrentStep(2)}>Back</button>
                    <button className="btn btn-success" onClick={placeOrder}>Place Your Order</button>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0 text-success">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee:</span>
                  <span>₹100.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>₹{(0.1 * calculateSubtotal()).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>₹{calculateTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddressSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={newAddress.name} onChange={handleAddressChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" name="street" value={newAddress.street} onChange={handleAddressChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={newAddress.city} onChange={handleAddressChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={newAddress.state} onChange={handleAddressChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="text" name="pincode" value={newAddress.pincode} onChange={handleAddressChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" value={newAddress.phone} onChange={handleAddressChange} required />
            </Form.Group>
            <Button variant="success" type="submit">
              Add Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Checkout;