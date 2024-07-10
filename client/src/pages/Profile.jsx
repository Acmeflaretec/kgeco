import React, { useState } from 'react';
import { Col, Row, Card, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import ManageAddress from './ManageAddress';
import './Profile.css';
import ProfileInfo from './ProfileInfo';

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    if (tab === 'orders') {
      navigate('/order');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="profile-page">
      <MiddleNav />
      <div className="container py-5">
        <Row>
          <Col lg={3}>
            <Card className="profile-sidebar mb-4">
              <Card.Body className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User"
                  className="rounded-circle img-thumbnail mb-3"
                  width="150"
                />
                <h4 className="mb-0">John Doe</h4>
                <p className="text-muted">john.doe@example.com</p>
              </Card.Body>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'profile'}
                    onClick={() => handleTabChange('profile')}
                  >
                    <FaUser className="me-2" /> Profile Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'address'}
                    onClick={() => handleTabChange('address')}
                  >
                    <FaMapMarkerAlt className="me-2" /> Manage Address
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => handleTabChange('orders')}>
                    <FaShoppingBag className="me-2" /> My Orders
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <Card.Body>
                {activeTab === 'profile' && <ProfileInfo />}
                {activeTab === 'address' && <ManageAddress />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;