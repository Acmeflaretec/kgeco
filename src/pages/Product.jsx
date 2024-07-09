import React, { useState } from 'react';
import { Button, Col, Container, Image, Row, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import Review from '../components/Review';
import './Product.css';

function Product() {
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: 'BAMBOO TOOTHBRUSH ',
    mrp: 1200,
    price: 700,
    images: [
      'https://img.freepik.com/free-photo/natural-bamboo-toothbrush-design-resource_53876-105932.jpg?w=996&t=st=1720515056~exp=1720515656~hmac=5a142d30dc6a4466bc0b8b33a0e1abdffe50e4e63cc70ffe4f71fbe6a261c224',
      'https://img.freepik.com/premium-photo/bamboo-toothbrushes-are-eco-friendly-with-copy-space-white-background-zero-waste-free-plastic-top-view_103882-216.jpg?w=996',
      'https://img.freepik.com/premium-photo/bamboo-toothbrushes-palm-leaf_87742-11370.jpg?w=826',
      "https://img.freepik.com/premium-photo/eco-friendly-toothbrushes-bamboo-plant_144962-12953.jpg?w=996"
    ],
    benefits: [
      "BPA-free bristles",
      "A sleek, natural look and feel",
      "100% Bamboo handle",
      "Compostable brush handle",
      "Biodegradable packaging"
    ],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias consequuntur commodi cupiditate inventore ipsum sit deleniti. Quod nulla rerum dolor quidem accusamus ea repellat, ratione enim tenetur sint perferendis?"
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <>
      <MiddleNav />
      <Container className="product-details-container my-5">
        <Row>
          {/* Image Gallery */}
          <Col lg={6} className="mb-4">
            <Carousel interval={null} slide={false}>
              {product.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={image}
                    alt={`Thumbnail ${index}`}
                    fluid
                    className="carousel-image"
                    onClick={() => handleThumbnailClick(index)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-info">
              <h1 className="product-name">{product.name}</h1>
              <div className="product-price">
                <span className="text-muted mrp">MRP: ₹{product.mrp}</span>
                <span className="h3 fw-bold">₹{product.price}</span>
                <span className="text-success discount">({((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% OFF)</span>
              </div>
              <p className="text-muted small mb-4">Inclusive of all taxes</p>

              <div className="product-benefits mb-4">
                <h5 className="mb-3">Key Benefits:</h5>
                <ul className="list-unstyled">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-grid gap-2">
                <Link to="/checkout" className="btn btn-success btn-lg">Buy Now</Link>
                <Button variant="outline-success" size="lg">Add to Cart</Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Product Description */}
        <Row className="mt-5">
          <Col>
            <div className="product-description">
              <h2 className="mb-3">Product Description</h2>
              <p>{product.description}</p>
            </div>
          </Col>
        </Row>

        {/* Reviews */}
        <Row className="mt-5">
          <Col>
            <Review />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Product;
