import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { useSelector } from 'react-redux';import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave } from 'react-icons/fa';
import LoadingScreen from '../components/loading/LoadingScreen';

function ProfileInfo() {

  const userDetails = useSelector(state => state.userDetails);
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const [profile, setProfile] = useState(userDetails);
  const [editable, setEditable] = useState({
    name: false,
    email: false,
    phone: false
  });

  const handleEdit = (field) => {
    setEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave =async (field) => {
    // Here you would typically save the changes to your backend
    console.log(`Saving ${field}: ${profile[field]}`);
    console.log('prof ',profile)
    handleEdit(field);
// 

try {
  const response = await axiosInstance.patch(`/user`,{
    [field]: profile[field] 
  })
window.location.reload()


} catch (error) {
  console.log(error)
}

  };

  const renderField = (field, icon) => (
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={3} className="text-muted">
        {icon} {field.charAt(0).toUpperCase() + field.slice(1)}
      </Form.Label>
      <Col sm={7}>
        <Form.Control
          type="text"
          name={field}
          value={profile[field]}
          onChange={handleChange}
          disabled={!editable[field]}
          className={editable[field] ? 'border-primary' : ''}
        />
      </Col>
      <Col sm={2}>
        <Button
          variant={editable[field] ? "success" : "outline-primary"}
          onClick={() => editable[field] ? handleSave(field) : handleEdit(field)}
          className="w-100"
        >
          {editable[field] ? <FaSave /> : <FaEdit />}
        </Button>
      </Col>
    </Form.Group>
  );

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="mb-4">Profile Information</Card.Title>
        <Form>
          {renderField('username', <FaUser className="me-2" />)}
          {renderField('email', <FaEnvelope className="me-2" />)}
          {renderField('phone', <FaPhone className="me-2" />)}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileInfo;