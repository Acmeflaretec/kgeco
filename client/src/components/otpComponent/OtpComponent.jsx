import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button,Spinner, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
function OtpComponent({emailId,setOpen,type,userDetails}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [error2,setError2] = useState('')
  const [resent, setResent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    // sendOtp()
 
     const timer = setInterval(() => {
       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
     }, 1000);
 
     return () => clearInterval(timer);
   }, []);
 
 
 const sendOtp= async()=>{

 try {
if(type === 'register'){
  const response = await axiosInstance.post("/user/sendRegistrationOtp", { email: emailId });
}else{
  const response = await axiosInstance.post("/user/sendOtp", { email: emailId });
}

 } catch (error) {
   console.log(error)
 }
 
 }
 
 
   const handleOtpChange = (e) => {
     const value = e.target.value;
     setOtp(value);
     if (value.length === 6) {
       setError('');
       handleSubmit(e,value);
     } else {
       setError('Please enter a valid 6-digit code.');
     }
   };
//  
   const handleSubmit = async(e,otpValue) => {
    e.preventDefault();

    setError2('');
    if(type === 'register'){

    try {
userDetails.clientOtp=otpValue

      const response = await axiosInstance.post('/auth/register', userDetails);
      console.log('Registration successful: ', response?.data?.data?.signupStatus);

      if (response?.data?.data?.signupStatus) {
        navigate('/login');
      }
    } catch (error) {
      setError2(error?.response?.data?.message || 'Registration failed');
      console.error('Error during registration: ', error);
    }

    }else{

  
 try {
   const response = await axiosInstance.post("/user/compareOtp", { email: emailId,otp:otpValue });
 
   if (response.status === 200) {
     // User found, navigate to OTP page
     setOpen(false)
     // Simulate OTP submission
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
   }else if(response.status === 400){
     setError2(response?.data?.message)
 
   }
 
 } catch (error) {
   
   setError2(error?.response?.data?.message)
 }
 

    }

 
  
   };

  //  const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMessage('');
  //   try {
  //     const response = await axiosInstance.post('/auth/register', userDetails);
  //     console.log('Registration successful: ', response?.data?.data?.signupStatus);

  //     if (response.data.data.signupStatus) {
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     setErrorMessage(error?.response?.data?.message || 'Registration failed');
  //     console.error('Error during registration: ', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
 
   const handleResend = () => {
     // Simulate sending OTP again
     sendOtp()
     setResent(true);
     setTimeLeft(180); // Reset the timer
     setTimeout(() => setResent(false), 3000);
   };
 
   const formatTime = (time) => {
     const minutes = Math.floor(time / 60);
     const seconds = time % 60;
     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };
 

  return (
    <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh' }}
  >
    <Row className="justify-content-md-center">
      <Col md="6">
        <div
          className="p-4"
          style={{
            backgroundColor: '#2D6507',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <h2 className="mb-3">Verify your email</h2>
          <p>We sent you a six-digit confirmation code to email.com. Please enter it below to confirm your email address.</p>
          <Form>
            <Form.Group controlId="formOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength="6"
                isInvalid={!!error && otp.length !== 6}
              />
              {error && otp.length !== 6 && <Form.Text className="text-danger">{error}</Form.Text>}
              {error2 && <Form.Text className="text-danger">{error2}</Form.Text>}
  
            </Form.Group>
          </Form>
          {success && <Alert variant="success">OTP verified successfully!</Alert>}
          <div className="mt-3">
            <p>Didn't receive a code? <Button variant="link" onClick={handleResend} disabled={timeLeft !== 0}>Send code again</Button></p>
            {resent && <Alert variant="success">Code resent successfully!</Alert>}
          </div>
          <div className="mt-3">
            <p>Time left: {formatTime(timeLeft)}</p>
          </div>
          <div className="mt-3">
          <Button variant="link" onClick={()=> navigate('/login')}>Back to login</Button>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default OtpComponent