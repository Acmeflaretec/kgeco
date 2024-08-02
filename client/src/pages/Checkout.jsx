import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { FaRegTrashAlt, FaLock, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import logoPng from "../assets/images/logo.png";
import LoadingScreen from "../components/loading/LoadingScreen";

const Checkout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "Ananthu xyz house yeroor po yeroor Yeroor KOLLAM, KERALA 691312"
  );
  const [paymentOption, setPaymentOption] = useState("razorpay");
  const [cartData, setCartData] = useState([]);
  const [filteredCartData,setFilteredCartData] = useState([])

  const [salePriceTotal, setSalePriceTotal] = useState(0);
  const [proPriceTotal, setProPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const deliveryCharge = 30;

  const [addressDatas, setAddressDatas] = useState([]);
  const [orderAddress, setOrderAddress] = useState({});

  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const fetchAddress = async (urlQ) => {
    try {
      const response = await axiosInstance.get(urlQ);
      setAddressDatas(response?.data?.data);
      const defAddress = response?.data?.data?.filter(
        (addr) => addr.primary == true
      );
      setOrderAddress(defAddress[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchAddress("/address");
  }, []);

  //

  const calculateTotalSalePrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.sale_rate * item.qty;
    });

    return totalSalePrice;
  };
  const calculateTotalProPrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.price * item.qty;
    });

    return totalSalePrice;
  };
  const calculateTotalDiscountPrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.discount;
    });

    return totalSalePrice;
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/getcarts`);
      setCartData(response?.data?.data);

      const items = response?.data?.data?.item;

      const filteredItems = items.filter((obj)=>{

        return obj.productId.isAvailable !=false
  
      })
      
      setFilteredCartData(filteredItems)

      // Calculate the total sale price
      const totalSalePrice = calculateTotalSalePrice(filteredItems);
      //console.log(totalSalePrice)
      setSalePriceTotal(totalSalePrice);

      // Calculate the total  price
      const totalProPrice = calculateTotalProPrice(filteredItems);
      //console.log(totalProPrice)
      setProPriceTotal(totalProPrice);

      // Calculate the total discount
      const totalDiscount = calculateTotalDiscountPrice(filteredItems);
      //console.log(totalDiscount)
      setDiscountTotal(totalDiscount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleRemoveItem = async (itemId) => {
    let urlQuery = `/user/removeFromCart/${itemId}`;
  
    try {
      const response = await axiosInstance.patch(urlQuery);
      const updatedFilteredCartItems = filteredCartData.filter(
        (item) => item._id !== itemId
      );
      const updatedTotalPrice = updatedFilteredCartItems.reduce(
        (acc, item) => acc + item.productId.price * item.qty,
        0
      );
  
      setFilteredCartData(updatedFilteredCartItems);
  
      // Calculate the total sale price
      const totalSalePrice = calculateTotalSalePrice(updatedFilteredCartItems);
      setSalePriceTotal(totalSalePrice);
  
      // Calculate the total  price
      const totalProPrice = calculateTotalProPrice(updatedFilteredCartItems);
      setProPriceTotal(totalProPrice);
  
      if (updatedFilteredCartItems?.length === 0) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };
  
  // const handleRemoveItem = async (itemId) => {
  //   let urlQuery = `/user/removeFromCart/${itemId}`;

  //   try {
  //     const response = await axiosInstance.patch(urlQuery);
  //     const updatedCartItems = cartData.item.filter(
  //       (item) => item._id !== itemId
  //     );
  //     const updatedTotalPrice = updatedCartItems.reduce(
  //       (acc, item) => acc + item.price * item.qty,
  //       0
  //     );

  //     setCartData({
  //       ...cartData,
  //       item: updatedCartItems,
  //       totalPrice: updatedTotalPrice,
  //     });
  //     const filteredItems = updatedCartItems.filter((obj)=>{

  //       return obj.productId.isAvailable !=false
  
  //     })

  //     // Calculate the total sale price
  //     const totalSalePrice = calculateTotalSalePrice(filteredItems);
  //     setSalePriceTotal(totalSalePrice);

  //     // Calculate the total  price
  //     const totalProPrice = calculateTotalProPrice(filteredItems);
  //     setProPriceTotal(totalProPrice);

  //     if (cartData?.item.length - 1 == 0) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error removing item from wishlist:", error);
  //   }
  // };

  //

  // const handleQuantityChange = async (item, operation, index) => {
  //   let QtyApi = item.qty;
  //   if (operation === "increment") {
  //     QtyApi += 1;
  //   } else if (operation === "decrement") {
  //     QtyApi -= 1;
  //   }
  //   // Optimistically update the UI
  //   const updatedCartData = { ...cartData };
  //   updatedCartData.item[index].qty = QtyApi;
  //   setCartData(updatedCartData);

  //   setLoadingIndex(index); // Set loading state

  //   try {
  //     if (item?.qty <= item?.productId?.stock && operation === "increment") {
  //       const response = await axiosInstance.patch(`/user/updateQty`, {
  //         qty: QtyApi,
  //         productId: item?.productId?._id,
  //       });
  //      await fetchData();
  //     } else if (item?.qty > 1 && operation === "decrement") {
  //       const response = await axiosInstance.patch(`/user/updateQty`, {
  //         qty: QtyApi,
  //         productId: item?.productId?._id,
  //       });
  //     await  fetchData();
  //     }
  //   } catch (error) {
  //     // Revert the state change if the API call fails
  //     const revertedCartData = { ...cartData };
  //     revertedCartData.item[index].qty = item.qty;
  //     setCartData(revertedCartData);
  //     console.log(error);
  //   } finally {
  //     setLoadingIndex(null); // Clear loading state
  //   }
  // };
  const handleQuantityChange = async (item, operation, index) => {
    let QtyApi = item.qty;
    if (operation === "increment") {
      QtyApi += 1;
    } else if (operation === "decrement") {
      QtyApi -= 1;
    }
  
    // Optimistically update the UI
    const updatedFilteredCartData = [...filteredCartData];
    updatedFilteredCartData[index].qty = QtyApi;
    setFilteredCartData(updatedFilteredCartData);
  
    setLoadingIndex(index); // Set loading state
  
    try {
      if (
        item?.qty <= item?.productId?.stock &&
        operation === "increment"
      ) {
        const response = await axiosInstance.patch("/user/updateQty", {
          qty: QtyApi,
          productId: item?.productId._id,
        });
        await fetchData();
      } else if (item?.qty > 1 && operation === "decrement") {
        const response = await axiosInstance.patch("/user/updateQty", {
          qty: QtyApi,
          productId: item?.productId._id,
        });
        await fetchData();
      }
    } catch (error) {
      // Revert the state change if the API call fails
      const revertedFilteredCartData = [...filteredCartData];
      revertedFilteredCartData[index].qty = item.qty;
      setFilteredCartData(revertedFilteredCartData);
      console.log(error);
    } finally {
      setLoadingIndex(null); // Clear loading state
    }
  };
  

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaymentSuccess = async () => {
    const orderFormat = {};

    const mappedCartItems = await filteredCartData?.map((item) => ({
      product_id: item.productId._id,
      qty: item.qty,
      price: item.productId.sale_rate,
    }));

    // Calculate the total price based on the cart items
    const totalPrice = mappedCartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );

    // Create the final 'products' object using the mapped cart items and total price
    const productsOrderData = {
      item: mappedCartItems,
      totalPrice,
    };

    // Now 'products' object is ready to be used following the defined schema

    const response = await axiosInstance.post(`/orders`, {
      payment_mode: paymentOption,
      amount: productsOrderData?.totalPrice,
      address: orderAddress,
      products: productsOrderData,
    });

    Swal.fire({
      title: "Success",
      text: "Your order has been placed!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
    navigate("/order");
  };

  const placeOrder = async () => {

    const totalAmountToPay = salePriceTotal < 299 
    ? salePriceTotal + deliveryCharge 
    : salePriceTotal;

    if (paymentOption === "cod") {
      handlePaymentSuccess();
    } else if (paymentOption === "razorpay") {
      const options = {
        key: "rzp_test_wNhVz81BFxrIrL",
        amount: parseInt(totalAmountToPay) * 100, // amount in paisa
        currency: "INR",
        name: "KGECO",
        description: "Purchase course",
        handler: function (response) {
          handlePaymentSuccess();
        },
        theme: {
          color: "#008000",
        },
        image: "logo.png",
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  // const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRadioChange = (addr) => {
    setSelectedAddress(addr);
  };

  const handleChangeAddress = () => {
    if (selectedAddress) {
      setOrderAddress(selectedAddress);
    }
  };

  // add address form
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    type: "Home",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
    country: "",
    // primary: true,
  });

  const handleChangeAddressCheckout = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, ":", e.target.value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitAddressCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/address", formData);
      setFormData("");
      setShowAddressModal(false);
      // handleClose();
      setAddressDatas([]);

      await fetchAddress("/address");
    } catch (error) {
      console.error("Error submitting address: ", error);
    }
  };

  // static
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
 
  
  

  return (
    <>
      {loadScreenState ? (
        <LoadingScreen />
      ) : (
        <div className="bg-light min-vh-100">
          <header className="bg-white shadow-sm">
            <div className="container py-3">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/" className="text-decoration-none">
                  <img
                    src="logo.png"
                    className="img-fluid"
                    width={120}
                    alt="Logo"
                  />
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
                {currentStep === 1 && (
                  <section className="card shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                      <h5 className="mb-0 text-success">1. Shipping Address</h5>
                    </div>
                    <div className="card-body">
                      {addressDatas.length === 0 ? (
                        <div className="text-center py-5">
                          <FaPlus className="text-muted mb-3" size={48} />
                          <h5 className="mb-3">No addresses found</h5>
                          <button
                            className="btn btn-success"
                            onClick={() => setShowAddressModal(true)}
                          >
                            Add New Address
                          </button>
                        </div>
                      ) : (
                        <div className="row g-3">
                          {addressDatas.map((address) => (
                            <div key={address._id} className="col-md-6">
                              <div
                                className={`border rounded p-3 h-100 ${
                                  selectedAddress === address
                                    ? "border-success"
                                    : ""
                                }`}
                              >
                                <p className="mb-1">
                                  <strong>
                                    {address.firstname} {address.lastname}
                                  </strong>
                                </p>
                                <p className="mb-1">{address.address_line_1}</p>
                                <p className="mb-1">{address.address_line_2}</p>
                                <p className="mb-1">
                                  {address.city}, {address.state}{" "}
                                  {address.pincode}
                                </p>
                                <p className="mb-1">{address.country}</p>
                                <p className="mb-3">Phone: {address.mobile}</p>
                                <button
                                  className={`btn ${
                                    orderAddress === address
                                      ? "btn-success"
                                      : "btn-outline-success"
                                  } w-100`}
                                  onClick={() => setOrderAddress(address)}
                                >
                                  {orderAddress === address
                                    ? "Selected"
                                    : "Select This Address"}
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="col-md-6">
                            <div className="border rounded p-3 h-100 d-flex align-items-center justify-content-center">
                              <button
                                className="btn btn-outline-success"
                                onClick={() => setShowAddressModal(true)}
                              >
                                <FaPlus className="me-2" />
                                Add New Address
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {orderAddress && (
                        <div className="mt-4 text-end">
                          <button
                            className="btn btn-success"
                            //  onClick={() => setCurrentStep(2)}
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setCurrentStep(2);
                            }}
                          >
                            Continue to Review
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {currentStep === 2 && (
                  <section className="card shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                      <h5 className="mb-0 text-success">2. Review Items</h5>
                    </div>
                    <div className="card-body">
                      {filteredCartData?.map((product, index) => (
                        <div
                          key={product?._id}
                          className="row mb-4 align-items-center"
                        >
                          <div className="col-md-3">
                            <img
                              src={`${
                                import.meta.env.VITE_API_BASE_URL_LOCALHOST
                              }/uploads/${product?.productId?.image[0]}`}
                              alt={product?.name}
                              className="img-fluid rounded"
                            />
                          </div>
                          <div className="col-md-6">
                            <h6 className="fw-bold mb-1">{product?.productId?.name}</h6>
                            {/* <p className="text-muted small mb-2">Microgreen</p> */}
                            <div className="d-flex align-items-center">
                              <span className="fw-bold me-2">
                                ₹{product?.productId?.sale_rate}
                              </span>
                              <span className="text-muted text-decoration-line-through small me-2">
                                ₹{product?.price}
                              </span>
                              <span className="bg-success-subtle text-success px-2 py-1 rounded-pill">
                                {product?.productId?.discount}% off
                              </span>
                            </div>
                          </div>

                          <div className="col-md-3 mt-4">
                            <div className="input-group">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    product,
                                    "decrement",
                                    index
                                  )
                                }
                                disabled={
                                  product?.qty === 1 || loadingIndex === index
                                }
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control text-center"
                                value={product?.qty}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    product,
                                    "increment",
                                    index
                                  )
                                }
                                disabled={loadingIndex === index}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="btn btn-link text-danger mt-2"
                              onClick={() => handleRemoveItem(product?._id)}
                            >
                              <FaRegTrashAlt /> Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentStep(1);
                          }}
                        >
                          Back
                        </button>

                        <button
                          className="btn btn-success"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentStep(3);
                          }}
                        >
                          {" "}
                          Continue to Payment
                        </button>
                      </div>
                      {/*  */}
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
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentOption"
                          id="razorpayOption"
                          value="razorpay"
                          checked={paymentOption === "razorpay"}
                          onChange={() => setPaymentOption("razorpay")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="razorpayOption"
                        >
                          <span className="fw-bold d-block mb-1">
                            Online Payment
                          </span>
                          <span className="text-muted small">
                            Pay securely with your credit/debit card or net
                            banking
                          </span>
                        </label>
                      </div>
                      <div className="form-check mb-3 p-3 border rounded">
                        <input
                          className="form-check-input"
                          type="radio"
                          disabled
                          name="paymentOption"
                          id="codOption"
                          value="cod"
                          checked={paymentOption === "cod"}
                          onChange={() => setPaymentOption("cod")}
                        />
                        <label className="form-check-label" htmlFor="codOption">
                          <span className="text-danger">
                            *** not available ***
                          </span>{" "}
                          <br />
                          <span className="fw-bold d-block mb-1">
                            Cash on Delivery
                          </span>
                          <span className="text-muted small">
                            Pay when your order is delivered
                          </span>
                        </label>
                      </div>
                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentStep(2);
                          }}
                        >
                          Back
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={placeOrder}
                        >
                          Place Your Order
                        </button>
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
                      <span>₹{proPriceTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Fee:</span>
                      {salePriceTotal > 299 ? (
                        <span className="text-decoration-line-through text-success">
                          ₹{deliveryCharge} Free Delivery{" "}
                        </span>
                      ) : (
                        <span>₹{deliveryCharge}</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Discount:</span>
                      <span>-₹{proPriceTotal - salePriceTotal}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>
                        ₹
                        {salePriceTotal < 299
                          ? salePriceTotal + deliveryCharge
                          : salePriceTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Modal
            show={showAddressModal}
            onHide={() => setShowAddressModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{"Add New Address"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitAddressCheckout}>
                <Form.Group className="mb-3">
                  <Form.Label>Address Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChangeAddressCheckout}
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address_line_1"
                    value={formData.address_line_1}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address_line_2"
                    value={formData.address_line_2}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChangeAddressCheckout}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Address
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Checkout;
