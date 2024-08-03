import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function EmailPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
e.preventDefault()
    try {
      const response = await axiosInstance.post("/user/checkemail", { email: userDetails.email });
      if (response.status === 200) {
        // User found, navigate to OTP page
        navigate(`/otp?email=${userDetails.email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User not found
        setErrorMessage(error?.response?.data?.message)
      } else {
        // Handle other errors
      }
    }
  };



  return (
    <Container className="my-5 bg-light p-4 rounded">
    <Row className="justify-content-md-center">
      <Col md={6}>
        <div className="shadow p-4 rounded">
          <h3 className="text-center mb-4">Email</h3>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

     
          
            <div className="d-grid gap-2">
              <Button
                variant="outline-success"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>

          <div className="mt-2 mb-2 text-center">
              <Link to="/login" className="text-primary">
                Back to login
              </Link>
            </div>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default EmailPage