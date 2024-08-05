import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button,Spinner, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
import OtpComponent from '../../components/otpComponent/OtpComponent';

import { FaLock } from "react-icons/fa";

function Otp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [error2,setError2] = useState('')
  const [resent, setResent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [open,setOpen]= useState(true)



  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    password: "",
    confirmPassword: "",
  });


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    setEmail(emailParam);
  }, [location]);

  useEffect(() => {

   // sendOtp()

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


const sendOtp= async()=>{
  const params = new URLSearchParams(location.search);
  const emailParam = params.get('email');
try {
  const response = await axiosInstance.post("/user/sendOtp", { email: emailParam });
} catch (error) {
  console.log(error)
}

}


  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    if (value.length === 6) {
      setError('');
      handleSubmit(value);
    } else {
      setError('Please enter a valid 6-digit code.');
    }
  };

  const handleSubmit = async(otpValue) => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
try {
  const response = await axiosInstance.post("/user/compareOtp", { email: emailParam,otp:otpValue });

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


 
  };

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

const handleChangePassword = async(e)=>{
  e.preventDefault();
  setIsLoading(true); // Start loading

  const params = new URLSearchParams(location.search);
  const emailParam = params.get('email');

if(userDetails.confirmPassword !== userDetails.password){
  setErrorMessage('both password should be the same')

}else{

  try {
    const response = await axiosInstance.post("/auth/changepassword", { email: emailParam,newPassword:userDetails.confirmPassword });
    navigate('/login')
  } catch (error) {
    setErrorMessage(error?.response?.data?.message)
  }finally {
    setIsLoading(false); // End loading
  }

}



}



  return (
<>

{
open ? (
  <OtpComponent emailId={email} setOpen={setOpen}/>

//   <Container
//   className="d-flex justify-content-center align-items-center"
//   style={{ height: '100vh' }}
// >
//   <Row className="justify-content-md-center">
//     <Col md="6">
//       <div
//         className="p-4"
//         style={{
//           backgroundColor: '#2D6507',
//           borderRadius: '10px',
//           color: 'white',
//         }}
//       >
//         <h2 className="mb-3">Verify your email</h2>
//         <p>We sent you a six-digit confirmation code to email.com. Please enter it below to confirm your email address.</p>
//         <Form>
//           <Form.Group controlId="formOtp">
//             <Form.Label>OTP</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={handleOtpChange}
//               maxLength="6"
//               isInvalid={!!error && otp.length !== 6}
//             />
//             {error && otp.length !== 6 && <Form.Text className="text-danger">{error}</Form.Text>}
//             {error2 && <Form.Text className="text-danger">{error2}</Form.Text>}

//           </Form.Group>
//         </Form>
//         {success && <Alert variant="success">OTP verified successfully!</Alert>}
//         <div className="mt-3">
//           <p>Didn't receive a code? <Button variant="link" onClick={handleResend} disabled={timeLeft !== 0}>Send code again</Button></p>
//           {resent && <Alert variant="success">Code resent successfully!</Alert>}
//         </div>
//         <div className="mt-3">
//           <p>Time left: {formatTime(timeLeft)}</p>
//         </div>
//         <div className="mt-3">
//         <Button variant="link" onClick={()=> navigate('/login')}>Back to login</Button>
//         </div>
//       </div>
//     </Col>
//   </Row>
// </Container>
)  :  

(
  <>
  
  <Container className="my-5 bg-light p-4 rounded">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="shadow p-4 rounded">
              <h3 className="text-center mb-4">Reset password</h3>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleChangePassword}>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={userDetails.password}
                      required
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      onClick={handlePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={userDetails.confirmPassword}
                      required
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      onClick={handlePasswordVisibility2}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword2 ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
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
                   Go back to login
                  </Link>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
  
  </>

)


}

</>


  );
}

export default Otp;
