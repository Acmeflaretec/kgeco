import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ManageAddress() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', name: 'User', phone: '9548598788', address: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit', pincode: '691312' },
    { id: 2, type: 'Work', name: 'User', phone: '9548598788', address: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit', pincode: '691312' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setCurrentAddress(null);
  };

  const handleShow = (address = null) => {
    setCurrentAddress(address);
    setShowModal(true);
  };

  const handleSave = (newAddress) => {
    if (currentAddress) {
      setAddresses(addresses.map(addr => addr.id === currentAddress.id ? { ...newAddress, id: currentAddress.id } : addr));
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className='p-4 shadow rounded'>
      <h5 className='fw-bold mb-4'>Manage Addresses</h5>
      <Button variant="outline-success" className='w-100 mb-4' onClick={() => handleShow()}>
        Add a new address
      </Button>
      {addresses.map((address) => (
        <div key={address.id} className='mb-3 border p-3 rounded'>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            <span className='bg-secondary-subtle p-1 rounded'>
              {address.type}
            </span>
            <div>
              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(address)}>Edit</Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(address.id)}>Delete</Button>
            </div>
          </div>
          <p className='fw-bold mb-1'>{address.name} | {address.phone}</p>
          <p className='text-muted mb-1'>{address.address}</p>
          <p className='fw-bold mb-0'>Pincode: {address.pincode}</p>
        </div>
      ))}

      <AddressModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        address={currentAddress}
      />
    </div>
  );
}

function AddressModal({ show, handleClose, handleSave, address }) {
  const [formData, setFormData] = useState(address || {
    type: 'Home',
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{address ? 'Edit Address' : 'Add New Address'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Address Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} name="address" value={formData.address} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Address
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ManageAddress;