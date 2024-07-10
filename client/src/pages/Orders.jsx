import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

const orderData = [
  {
    id: 1,
    name: 'ECO-FRIENDLY COTTON BUDS',
    // category: 'Seeds',
    price: 999,
    status: 'Order Placed',
    statusDetails: 'Your order has been placed',
    image: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996'
  },
  // Add more order objects as needed
];

function OrderCard({ order }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={3} className="mb-3 mb-md-0">
            <img src={order.image} alt={order.name} className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h5 className="mb-1">{order.name}</h5>
            <p className="text-muted mb-2">{order.category}</p>
            <span bg="info" className="mb-2">{order.status}</span>
            <p className="small mb-0">{order.statusDetails}</p>
          </Col>
          <Col md={3} className="text-md-end">
            <h5 className="mb-3">₹{order.price}</h5>
            <Link to={`/ordertrack`} className="btn btn-outline-primary btn-sm">
              Track Order
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function Orders() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MiddleNav />
      <Container className="flex-grow-1 py-5">
        <h2 className="mb-4">Your Orders</h2>
        {orderData.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default Orders;