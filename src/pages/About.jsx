import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

const About = () => {
  return (
    <>
      <MiddleNav />
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Image
                src="https://img.freepik.com/premium-photo/set-lowcost-ecofriendly-bamboo-bathroom-accessories_929909-225.jpg?w=740"
                alt="About"
                fluid
                rounded
                className="shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <div className="px-lg-4">
                <h2 className="fw-bold mb-4">About Us</h2>
                <p className="lead">
                  Welcome to KGECO, where sustainability meets innovation. We are passionate about creating eco-friendly solutions that make a difference.
                </p>
                <p>
                  At KGECO, we believe in the power of sustainable living. Our journey started with a commitment to reduce environmental impact while offering stylish, eco-conscious products for everyday life.
                </p>
                <p>
                  Our mission is to inspire and empower individuals to make greener choices without compromising on quality or style. From our materials to our practices, sustainability is at the heart of everything we do.
                </p>
                <p>
                  Join us on our journey towards a more sustainable future. Together, we can make a positive impact on the planet, one step at a time.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default About;
