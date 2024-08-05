
import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Image, Form, Button, Alert, Spinner } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OtpComponent from '../../components/otpComponent/OtpComponent';

function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open,setOpen] = useState(true)
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/user/checkRegisterEmail", { email: userDetails?.email });
      if (response.status === 200) {

        sendOtp()
        setOpen(false)
        // User found, open otp component
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User not found
        setErrorMessage(error?.response?.data?.message)
      } else {
        setErrorMessage(error?.response?.data?.message)
      }
    } finally {
          setIsLoading(false);
        }
  
  };



  //sending otp fn

  const sendOtp= async()=>{
    
    try {
      const response = await axiosInstance.post("/user/sendRegistrationOtp", { email:userDetails?.email });
      
    } catch (error) {
      console.log(error)
      setErrorMessage('Something went wrong please try again')
    }
    
    }

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
<>
{open ? (
      <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="shadow p-4 rounded">
            <h3 className="text-center mb-4">Register</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  value={userDetails.username}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  required
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPhone" label="Phone number" className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="123-456-7890"
                  required
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? '👁' : '👁‍🗨'}
                </span>
              </FloatingLabel>
              <div className='mt-3 d-flex justify-content-between align-items-center'>
                <Button variant="outline-success" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                </Button>
                <span>
                  Already a user?
                  <Link to={'/login'} className='text-primary'>
                    Login
                  </Link>
                </span>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
):


(
<OtpComponent emailId={userDetails.email} setOpen={setOpen}  type='register' userDetails={userDetails} />
)
}
</>

    </>
  );
}

export default Register;

