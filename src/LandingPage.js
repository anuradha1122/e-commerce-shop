import React from 'react';
import BrandList from './components/BrandList';
import Product from './components/Product';
import Slider from "react-slick";
import TopCategoryList from './components/TopCategoryList';
import TopProductList from './components/TopProductList';
import { Container, Row, Col, Button, Pagination, Carousel, Card, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faMagnifyingGlass, faAngleDown, faCheck, faShippingFast, faExchangeAlt, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

export default function
  () {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    className: 'notes-slider',
  };

  return (
    <>
      <Container fluid className='py-0 px-xl-5'>
        <Slider {...settings}>
          <div>
            <img src="images/carousel/carousel-1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div>
            <img src="images/carousel/carousel-1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div>
            <img src="images/carousel/carousel-1.jpg" className="d-block w-100" alt="..." />
          </div>
        </Slider>
      </Container>

      <Container fluid className='py-3 px-xl-5'>

        <div className='my-4'>
          <Row>
            <Col sm>
              <Card className='my-2'>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon className="float-end mx-3" icon={faCheck} /></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm>
              <Card className='my-2'>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon className="float-end mx-3" icon={faShippingFast} /></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm>
              <Card className='my-2'>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon className="float-end mx-3" icon={faExchangeAlt} /></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm>
              <Card className='my-2'>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon className="float-end mx-3" icon={faPhoneVolume} /></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <TopCategoryList />
        <div className='text-center py-5'>
          <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
        </div>
        <TopProductList />

      </Container>

      <Container fluid className="bg-secondary py-4 px-xl-5">
        <Row className='justify-content-md-center'>
          <Col md={6} sm={12}>
            <div className='text-center py-5'>
              <h2 className="section-title px-5"><span className="px-2 bg-secondary">Stay Updated</span></h2>
              <p>Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam labore at justo ipsum eirmod duo labore labore.</p>
              <Form>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Email goes here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-primary" id="button-addon2">
                    Button
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className='py-3 px-xl-5'>
        <div className='text-center py-5'>
          <h2 className="section-title px-5"><span className="px-2">Just Arrived</span></h2>
        </div>
        <TopProductList />
      </Container>

      <Container fluid className='py-3 px-xl-5'>
        <BrandList />
      </Container>
    </>
  )
}
