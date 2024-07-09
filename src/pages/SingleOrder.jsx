import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { FaBox, FaShippingFast, FaTruck, FaCheckCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import './SingleOrder.css';

function SingleOrder() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('order_confirmed');

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
    const backendStatus = dataFromBackend.status.toLowerCase().replace(/ /g, '_');
    setStatus(backendStatus);

    switch (backendStatus) {
      case 'order_confirmed': setProgress(0); break;
      case 'shipped': setProgress(33); break;
      case 'out_for_delivery': setProgress(66); break;
      case 'delivered': setProgress(100); break;
      default: setProgress(0);
    }
  }, [dataFromBackend]);

  const renderProgressBar = () => {
    const steps = [
      { name: 'Order Confirmed', icon: <FaBox />, completed: progress >= 0 },
      { name: 'Shipped', icon: <FaShippingFast />, completed: progress >= 33 },
      { name: 'Out for Delivery', icon: <FaTruck />, completed: progress >= 66 },
      { name: 'Delivered', icon: <FaCheckCircle />, completed: progress >= 100 },
    ];

    return (
      <div className="progress-container mb-4">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`round-point ${step.completed ? 'completed' : ''}`}
            style={{ left: `${index * 33}%` }}
          >
            <div className="icon-container">{step.icon}</div>
            <p>{step.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <MiddleNav />
      <Container className="my-5">
        <h2 className="mb-4">Order Details</h2>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <img
                    src={dataFromBackend.orderDetails.items[0].imageUrl}
                    alt=""
                    className="img-fluid rounded me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-1">{dataFromBackend.orderDetails.items[0].name}</h5>
                    <span className="text-muted small">{dataFromBackend.orderDetails.items[0].category}</span>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3 mb-md-0">
                {renderProgressBar()}
              </Col>
            
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-3">Order Summary</h5>
                <Table responsive borderless className="mb-0">
                  <tbody>
                    <tr>
                      <td>Order ID</td>
                      <td className="text-end">{dataFromBackend.orderDetails.orderId}</td>
                    </tr>
                    <tr>
                      <td>Order Date</td>
                      <td className="text-end">{dataFromBackend.orderDetails.orderDate}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="text-end">
                        <span className="text-success fw-bold">{status.replace(/_/g, ' ')}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td className="text-end fw-bold">₹{dataFromBackend.orderDetails.total}</td>
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
                <p className="mb-1 fw-bold">{dataFromBackend.orderDetails.shippingAddress.name}</p>
                <p className="mb-1">{dataFromBackend.orderDetails.shippingAddress.address}</p>
                <p className="mb-0">
                  {dataFromBackend.orderDetails.shippingAddress.city},{' '}
                  {dataFromBackend.orderDetails.shippingAddress.state}{' '}
                  {dataFromBackend.orderDetails.shippingAddress.zip}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SingleOrder;