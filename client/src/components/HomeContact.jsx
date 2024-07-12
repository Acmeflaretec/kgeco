import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeContact() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">Get In Touch</h2>
        <p className="mb-4">
          Have questions about our products or need assistance? We're here to help! Reach out to us for any inquiries or support.
        </p>
        <Link to="/contactus" className="btn btn-primary">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default HomeContact;
