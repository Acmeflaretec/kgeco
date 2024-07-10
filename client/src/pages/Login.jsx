import React, { useState } from 'react';
import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log('Logging in...');
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
              <span className="fw-bold">Secure Login</span>
            </div>
          </div>
        </Container>
      </header>
      <Container className="my-5 bg-light p-4 rounded">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="shadow p-4 rounded">
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
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
                  </div>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="outline-success" type="submit">
                    Login
                  </Button>
                </div>
              </Form>

              <div className="mt-3 text-center">
                New here?{' '}
                <Link to="/register" className="text-primary">
                  Create an account
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
