// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import { useNavigate } from 'react-router-dom';
// import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { FaLock } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// function Register() {
//   const [userDetails, setUserDetails] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();




//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post('/auth/register', userDetails);
//       console.log('Registration successful: ', response?.data?.data?.signupStatus);
//       // You can redirect the user to the login page or show a success message

// if(response.data.data.signupStatus){

//   navigate('/login')

// }

//     } catch (error) {
//       console.log(error?.response?.data?.message)

//       console.error('Error during registration: ', error);
    
//     }
//   };

//   return (
//     <>
//       <header className="bg-white shadow-sm">
//         <Container className="py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <Link to="/" className="text-decoration-none">
//               <Image src="logo.png" fluid alt="Logo" style={{ maxWidth: '120px' }} />
//             </Link>
//             <div className="text-success">
//               <FaLock className="me-2" />
//               <span className="fw-bold">Secure Sign Up</span>
//             </div>
//           </div>
//         </Container>
//       </header>

//       <Container className="py-5">
//         <Row className="justify-content-md-center">
//           <Col md={6}>
//             <div className="shadow p-4 rounded">
//               <h3 className="text-center mb-4">Register</h3>
//               <Form onSubmit={handleSubmit}>
//                 <FloatingLabel
//                   controlId="floatingname"
//                   label="Username"
//                   className="mb-3"
//                 >
//                   <Form.Control
//                     type="text"
//                     placeholder="Username"
//                     name="username"
//                     required
//                     value={userDetails.username}
//                     onChange={handleChange}
//                   />
//                 </FloatingLabel>
//                 <FloatingLabel
//                   controlId="floatingInput"
//                   label="Email address"
//                   className="mb-3"
//                 >
//                   <Form.Control
//                     type="email"
//                     placeholder="name@example.com"
//                     name="email"
//                     required
//                     value={userDetails.email}
//                     onChange={handleChange}
//                   />
//                 </FloatingLabel>
//                 <FloatingLabel
//                   controlId="floatingPhone"
//                   label="Phone number"
//                   className="mb-3"
//                 >
//                   <Form.Control
//                     type="tel"
//                     placeholder="123-456-7890"
//                     required
//                     name="phone"
//                     value={userDetails.phone}
//                     onChange={handleChange}
//                   />
//                 </FloatingLabel>
//                 <FloatingLabel
//                   controlId="floatingPassword"
//                   label="Password"
//                   className="position-relative"
//                 >
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     required
//                     name="password"
//                     value={userDetails.password}
//                     onChange={handleChange}
//                   />
//                   <span
//                     className="position-absolute top-50 end-0 translate-middle-y me-3"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {showPassword ? '👁' : '👁‍🗨'}
//                   </span>
//                 </FloatingLabel>
//                 <div className='mt-3 d-flex justify-content-between align-items-center'>
//                   <button className='btn btn-outline-success' type="submit">Sign Up</button>
//                   <span>
//                     Already a user?
//                     <Link to={'/login'} className='text-primary'>
//                      Login
//                     </Link>
//                   </span>
//                 </div>
//               </Form>
//               {/* <Form onSubmit={handleSubmit}>
//                 <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
//                   <Form.Control type="text" placeholder="Enter username" />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
//                   <Form.Control type="email" placeholder="name@example.com" />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 position-relative">
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                   />
//                   <span
//                     className="position-absolute top-50 end-0 translate-middle-y me-3"
//                     onClick={handlePasswordVisibility}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {showPassword ? '👁️' : '👁️‍🗨️'}
//                   </span>
//                 </FloatingLabel>
//                 <div className="d-grid gap-2">
//                   <Button variant="outline-success" type="submit">
//                     Sign Up
//                   </Button>
//                 </div>
//               </Form> */}

//               <div className="mt-3 text-center">
//                 Already a user?{' '}
//                 <Link to="/login" className="text-primary">
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Register;
import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Image, Form, Button, Alert, Spinner } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
    setErrorMessage('');
    try {
      const response = await axiosInstance.post('/auth/register', userDetails);
      console.log('Registration successful: ', response?.data?.data?.signupStatus);

      if (response.data.data.signupStatus) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Registration failed');
      console.error('Error during registration: ', error);
    } finally {
      setIsLoading(false);
    }
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
    </>
  );
}

export default Register;

