import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Footer() {
  return (
    <div>
        <footer className="text-white py-5" style={{ backgroundColor: "#ff5e00" }}>
    <Container>
      <Row>
        <Col md={4}>
          <h5>Shop</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/" style={{ textDecoration: 'none', color: 'white' }}>Homee</a>
            </li>
            <li>
              <a href="/shop" style={{ textDecoration: 'none', color: 'white' }}>Shop</a>
            </li>
            <li>
              <a href="/about" style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
            </li>
          </ul>
        </Col>
        <Col md={4} className='text-white'>
          <h5 className='text-white'>Contact Us</h5>
          <p className='text-white'>Email: info@shopify.com</p>
          <p className='text-white'>Phone: +1234567890</p>
        </Col>
        <Col md={4}>
          <h5 className='text-white'>Stay Connected</h5>
          <p className='text-white'>Follow us on social media for updates:</p>
          
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <p className='text-white'>&copy; 2024 Your Store. All rights reserved.</p>
        </Col>
        <Col md={6}>
          <Form className="d-flex">
            <Form.Control type="email" placeholder="Your Email" className="me-2" />
            <Button variant="outline-light">Subscribe</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </footer>
    </div>
  )
}

export default Footer