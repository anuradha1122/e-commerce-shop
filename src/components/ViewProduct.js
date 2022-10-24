import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  generatePath,
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";
import { useLocation } from "react-router";
import DataContext from '../helpers/MyContext';
import AuthService from '../services/Auth-service';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../services/Axios';

export default function ViewProduct() {

  const navigate = useNavigate();

  //Scroll To Top on Route Change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])
  //-------------------------------

  const { id } = useParams('');
  const { producstList, addToCart, addToWatch, addPayItem } = useContext(DataContext);
  //console.log(producstList)

  const [addCartSucssce, setAddCartSucssce] = useState(false);
  const [addWatchSucssce, setAddWatchSucssce] = useState(false);
  const [addQty, setQty] = useState(1);

  const addToCartHandle = (filteredProduct) => {
    addToCart(filteredProduct);
    setAddCartSucssce(true);
  }

  const addToWatchHandle = (ProductCode) => {
    addToWatch(ProductCode);
    setAddWatchSucssce(true);
  }

  const QtyPlus =() =>{
    //console.log(addQty);
    setQty(addQty +1);
  }
  const QtyMinus =() =>{
    //console.log(addQty);
    if(addQty>1){
      setQty(addQty -1);
    }
  }

  const payHandle =(filteredProduct)=>{
    if(filteredProduct){
      addPayItem([{ ...filteredProduct, qty: addQty }]);
    }else{
      return
    } 
    
  }

  return (
    <div>
      {producstList.filter(fProduct => fProduct.PRDUCT_CODE === id).map((filteredProduct, index) => (
        <div key={index}>
          <Container fluid className='py-5 px-xl-5'>
            <Row>
              <Col xs={12} md={4}>
                <div className="rounded">
                  <img className="w-100 h-100" src={axiosInstance.defaults.baseURL+ filteredProduct.IMG_URL} alt="" />
                </div>
              </Col>
              <Col xs={12} md={8}>
                <h3 className="font-weight-semi-bold text-capitalize">{filteredProduct.PRODUCT_NAME} (Id: {filteredProduct.PRDUCT_CODE})</h3>
                <div className="d-flex mb-3">
                  <div className="text-primary mr-2">
                    <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                    <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                    <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                    <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                    <small><FontAwesomeIcon className="text-primary m-1" icon={faStarHalfAlt} /></small>
                  </div>
                  <small className="">(50 Reviews)</small>
                </div>
                <span className='me-3 fs-2'>$ {(Math.round(filteredProduct.PRICE * 100) / 100).toFixed(2)} </span> <span className='text-muted text-decoration-line-through'>$ {(Math.round((filteredProduct.PRICE * filteredProduct.DISCOUNT / 100) * 100) / 100).toFixed(2)}</span>
                <p className="mb-4 text-lowercase">{filteredProduct.SHORT_DISCRIPTION}</p>

                <div className='my-4'>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary" onClick={QtyMinus}>-</Button>
                    <Button variant="outline-secondary" disabled>Quantity: {addQty}</Button>
                    <Button variant="outline-secondary" onClick={QtyPlus} >+</Button>
                  </ButtonGroup>
                </div>

                {addCartSucssce && <Badge bg="success mb-2">Add to cart success</Badge>}{' '}
                {addWatchSucssce && <Badge bg="success mb-2">Add to watchlist success</Badge>}

                <div className='price-cad'>
                  <Button onClick={() => payHandle(filteredProduct)} variant="primary">Buy It Now</Button>{' '}
                  <Button onClick={() => addToCartHandle(filteredProduct)} variant="secondary">Add to cart</Button>{' '}
                </div>
              </Col>
            </Row>
            <div className='my-5'>
              <Tabs
                defaultActiveKey="specification"
                id="uncontrolled-tab-example"
                className="mb-3 justify-content-center"
              >
                <Tab eventKey="specification" title="Specification">
                  <h4 className="mb-3">Product Description</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Tab>
                <Tab eventKey="warranty" title="Warranty">
                  <h4 className="mb-3">Additional Information</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews (0)">
                  <Row>
                    <Col xs={12} md={6}>
                      <h4 className="mb-3">Additional Information</h4>
                      <div className='mb-4 d-flex'>
                        <div className='d-inline-block'>
                          <img src="https://picsum.photos/seed/picsum/200/300" className="my-logo rounded me-2" />
                        </div>
                        <div className='d-inline-block'>
                          <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                          <div className="text-primary">
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStarHalfAlt} /></small>
                          </div>
                          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <h4 className="mb-3">Additional Information</h4>
                      <small>Your email address will not be published. Required fields are marked *</small>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Your Rating *</Form.Label>
                          <div className="text-primary">
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStar} /></small>
                            <small><FontAwesomeIcon className="text-primary m-1" icon={faStarHalfAlt} /></small>
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Your Email *</Form.Label>
                          <Form.Control type="text" placeholder="example@gmail.com" required isInvalid={false} />
                          <Form.Control.Feedback type="invalid">
                            Please choose a username.
                          </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Your Name *</Form.Label>
                          <Form.Control type="text" placeholder="A.P.D Kumaran" required isInvalid={false} />
                          <Form.Control.Feedback type="invalid">
                            Please choose a username.
                          </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Your Review *</Form.Label>
                          <Form.Control as="textarea" rows={3} required />
                        </Form.Group>

                        <Button className='my-3 float-end' variant="primary" type="submit">submit</Button>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </div>
          </Container>
        </div>
      ))}
    </div>
  )
}
