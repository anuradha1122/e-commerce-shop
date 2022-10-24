import React, { useContext, useState } from 'react';
import axiosInstance from '../services/Axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faYoutube, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight, faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../helpers/MyContext';

export default function Footer() {
  const { topCategoryList } =useContext(DataContext);
  const handleSubmit = () => { }
  return (

    <Container fluid className='bg-dark py-4 text-light px-xl-5'>
      <Row>
        <Col lg={4} md={12} className=''>
          <div className="d-flex flex-row">
            <div className=""><img src={axiosInstance.defaults.baseURL + 'logo.png'} className="my-logo rounded float-start" /></div>
            <div className="my-1"><span className='brand-name text-light'>Beauty Care</span></div>
          </div>
          <div className='py-3'>
            <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
            <p className="text-light mb-2"><FontAwesomeIcon className="me-3" icon={faMapMarkerAlt} />123 Street, New York, USA</p>
            <p className="text-light mb-2"><FontAwesomeIcon className="me-3" icon={faEnvelope} />info@example.com</p>
            <p className="text-light mb-0"><FontAwesomeIcon className="me-3" icon={faPhoneAlt} />+012 345 67890</p>
          </div>
        </Col>
        <Col lg={8}>
          <Row xs={1} md={3}>
            <Col className=''>
              <div>
                <h5 className="font-weight-bold text-light mb-4">Top Catagory</h5>
                <div className="d-flex flex-column justify-content-start">
                {topCategoryList.map((res, index)=>
                      <Link className="text-light mb-2" key={index} as={NavLink} to={`/s-category/${res.CATEGORY_CODE}`}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />{res.CATOGARY_NAME}</Link>
                    )}
                  
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Our Shop</Link>
                </div>
              </div>
            </Col>
            <Col className=''>
              <div>
                <h5 className="font-weight-bold text-light mb-4">Quick Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Home</Link>
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Our Shop</Link>
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Shop Detail</Link>
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Shopping Cart</Link>
                  <Link className="text-light mb-2" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Checkout</Link>
                  <Link className="text-light" to={'/'}><FontAwesomeIcon className="text-light me-3" icon={faAngleRight} />Contact Us</Link>
                </div>
              </div>
            </Col>
            <Col className='text-center text-md-start '>
              <div>
                <h5 className="font-weight-bold text-light mb-4">Newsletter</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter email" required isInvalid={false} />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Name" required isInvalid={false} />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button className='w-100 my-2' variant="primary" type="submit">
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row xs={1} md={2} className='border-top border-light py-4'>
        <Col className=''>
          <div>
            <p className="mb-md-0 text-center text-md-start text-light">
              &copy; <a className="text-secondary font-weight-semi-bold" href="#">Your Site Name</a>. All Rights Reserved. Designed
              by  <a className='text-secondary' href="https://themewagon.com" target="_blank">tecgaz</a>
            </p>
          </div>
        </Col>
        <Col className='text-center text-md-end '>
          <div>
            <img className="img-fluid" src="images/payments.png" alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
