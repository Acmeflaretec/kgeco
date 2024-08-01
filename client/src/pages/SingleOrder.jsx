import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { FaBox, FaShippingFast, FaTruck, FaCheckCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { useParams } from 'react-router-dom';
import './SingleOrder.css';
import LoadingScreen from '../components/loading/LoadingScreen';

function SingleOrder() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('order_confirmed');

  const { orderId } = useParams();
  const [ordersData,setOrdersData] = useState({})
  const [address,setAddress] = useState({})
  const [productsData,setProductsData] = useState([])
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state


 // console.log('ord id :',orderId)
  const fetchOrderData  = async()=>{

    try {
      const response = await axiosInstance.get(`/orders/getorderbyid/${orderId}`)
      setOrdersData(response?.data?.data)
      setAddress(response?.data?.data?.address)
      setProductsData(response?.data?.data?.products?.item)
    } catch (error) {
      
    }finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
  }
  }
  
  
  useEffect(()=>{
  fetchOrderData()
  },[])



  // Sample data from backend (same as before)
  const dataFromBackend = {
    status: 'out_for_delivery',
    orderDetails: {
      orderId: '12345678',
      orderDate: '2023-05-15',
      items: [
        {
          name: 'ECO-FRIENDLY COTTON BUDS',
          quantity: 1,
          price: 999,
          imageUrl: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996',
          category: 'Seeds',
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Anytown USA',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      total: 999,
    },
  };

  useEffect(() => {
    // const backendStatus = dataFromBackend.status.toLowerCase().replace(/ /g, '_');
    // setStatus(backendStatus);

    switch (ordersData?.status) {
      case 'Placed':
        setProgress(0);
        break;
      case 'Shipped':
        setProgress(33);
        break;
      case 'Out for delivery':
        setProgress(66);
        break;
      case 'Delivered':
        setProgress(100);
        break;
      default: setProgress(0);
    }
  }, [dataFromBackend]);

  const renderProgressBar = () => {
    const steps = [
      { name: 'Order Confirmed', icon: <FaBox />, completed: progress >= 0 },
      { name: 'Shipped', icon: <FaShippingFast />, completed: progress >= 25 },
      { name: 'Out for Delivery', icon: <FaTruck />, completed: progress >= 66 },
      { name: 'Delivered', icon: <FaCheckCircle />, completed: progress >= 100 },
    ];

    return (
      <div className="progress-container mb-4">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`round-point ${step?.completed ? 'completed' : ''}`}
            style={{ left: `${index * 33}%` }}
          >
            <div className="icon-container">{step?.icon}</div>
            <p className='stepsmob'  >{step?.name}</p>
           
          </div>
        ))}
         <p className='stepsmob2 '  >{ordersData.status}</p>
      </div>
    );
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <MiddleNav />
{
   loadScreenState ? (
    <LoadingScreen/>
  )  : (
    <Container className="my-5">
    <h2 className="mb-4">Order Details</h2>


    <div style={{display:'flex',width:'100%',justifyContent:'center'}}  >
    <Col md={6} className="mb-3 mb-md-0">
{ renderProgressBar()}

</Col>
    </div>


 
{ordersData?.products?.item?.map((item,index)=>(
 <Card className="shadow-sm mb-4">
 <Card.Body>
   <Row className="align-items-center">

<Col md={3} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <img
               src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.product_id?.image[0]}`}
                alt=""
                className="img-fluid rounded me-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div>
                <h5 className="mb-1"> {index+1}. {item?.product_id?.name}</h5>
              </div>
            </div>
          </Col>
{/* {index == 0 &&
<Col md={6} className="mb-3 mb-md-0">
{ renderProgressBar()}
</Col>
} */}
</Row>
</Card.Body>
</Card>

))

          
}

         

    <Row>
      <Col md={8}>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-3">Order Summary</h5>
            <Table responsive borderless className="mb-0">
              <tbody>
                <tr>
                  <td>Order ID</td>
                  <td className="text-end">{ordersData?._id}</td>
                </tr>
                <tr>
                  <td>Order Date</td>
                  <td className="text-end">{formatDate(ordersData?.createdAt)}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td className="text-end">
                    <span className="text-success fw-bold">{ordersData?.status}</span>
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className="text-end fw-bold">₹{ordersData?.amount}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Delivery Address</h5>
            <p className="mb-1 fw-bold">{address?.firstname} {address?.lastname}</p>
            <p className="mb-1">{address?.address_line_1}</p>
            <p className="mb-1">{address?.address_line_2}</p>

            <p className="mb-0">
              {address?.city},{' '}
              {address?.state}{' '}
              {address?.zip}{' '}
              {address?.Country}
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

    
      <Footer />
    </>
  );
}

export default SingleOrder;