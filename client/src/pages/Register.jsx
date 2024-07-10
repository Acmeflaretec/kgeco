import React, { useState } from 'react';
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your registration logic here
    console.log('Registering user...');
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <Container className="py-3">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none">
              <Image src="logo.png" fluid alt="Logo" style={{ maxWidth: '120px' }} />
            </Link>
            <div className="text-success">
              <FaLock className="me-2" />
              <span className="fw-bold">Secure Sign Up</span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="shadow p-4 rounded">
              <h3 className="text-center mb-4">Register</h3>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                  <Form.Control type="text" placeholder="Enter username" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    onClick={handlePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </FloatingLabel>
                <div className="d-grid gap-2">
                  <Button variant="outline-success" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>

              <div className="mt-3 text-center">
                Already a user?{' '}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
