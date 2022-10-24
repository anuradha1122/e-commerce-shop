import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, NavDropdown, Navbar, Nav, Badge } from 'react-bootstrap';
import Select from 'react-select';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faYoutube, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AuthService from "../services/Auth-service";
import DataContext from '../helpers/MyContext';
import axiosInstance from '../services/Axios';

export default function Header(props) {

  const { user, isLogin } = props;
  const { watchList, topCategoryList, cartItems, producstList } = useContext(DataContext);

  const navigate = useNavigate();

  const [inputText, setInputText] = useState(null);

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.value.toLowerCase();
    //setInputText(lowerCase);
    //alert(inputText);
    navigate(`/product/${lowerCase}`);
  };

  const logout = async () => {
    AuthService.logout();
    navigate('/login');
    //window.location.reload();
  };

  const options = producstList.map((p, index)=>
    {
      return {
        label: p.PRODUCT_NAME,
        value: p.PRDUCT_CODE,
        key: index
     }
    }
  );

  return (
    <>
      <Container fluid className='bg-dark py-1 px-xl-5'>
        <Row xs={1} md={2} >
          <Col className='d-none d-md-block d-lg-block'>
            <div className=''>
              <Link to={'/contact'} className='me-2 text-light' >FAQs</Link>
              <Link to={'/contact'} className='me-2 text-light' >Help & Contact</Link>
            </div>
          </Col>
          <Col className='text-center text-md-end'>
            <div>
              <a className='ms-2 text-light' href="#news"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a className='ms-2 text-light' href="#home"><FontAwesomeIcon icon={faTwitter} /></a>
              <a className='ms-2 text-light' href="#about"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a className='ms-2 text-light' href="#about"><FontAwesomeIcon icon={faInstagram} /></a>
              <a className='ms-2 text-light' href="#contact"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className='py-2 px-xl-5'>
        <Row className='d-flex align-items-center'>
          <Col xs={12} lg={3} className='text-primary d-none d-md-none d-lg-block'>
            <div className="d-flex flex-row">
              <div className=""><img src={axiosInstance.defaults.baseURL+ 'logo.png'} className="my-logo rounded float-start" /></div>
              <div className="my-1"><span className='brand-name text-primary'>Beauty Care</span></div>
            </div>
          </Col>
          <Col xs={9} lg={6} className='text-primary'>
            <div className="form-group has-search">
              <Select 
              options={options} 
              placeholder="Type something and press enter..."
              onChange={inputHandler}
              />
            </div>
          </Col>
          <Col xs={3} lg={3} className='text-primary text-end'>
            <div>
              <Button variant="outline-secondary ms-2" as={NavLink} to={'/basket'}>
                <FontAwesomeIcon className="my-badge text-primary position-relative" icon={faCartShopping} /> {cartItems.length > 0 && <Badge bg="secondary">{cartItems.length}</Badge>}
                <span className="visually-hidden">unread messages</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Navbar bg="" expand="lg" className='shadow-sm border-top'>
        <Container fluid className='px-xl-5'>
          <Navbar.Brand className='d-lg-none d-xl-none'>
            <div className="d-flex flex-row">
              <div className=""><img src={axiosInstance.defaults.baseURL + 'logo.png'} className="my-logo rounded float-start" /></div>
              <div className="my-1"><span className='brand-name text-primary'>Beauty Care</span></div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              {isLogin ? (
                <>
                  <NavDropdown title="Category" id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/category" >Preview category page</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/dash/catitem" >
                      Add Category
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Product" id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/product" >Preview product page</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/dash/product" >
                      Add Product
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={NavLink} to="/dash/brands">Brands</Nav.Link>
                  <Nav.Link as={NavLink} to="/dash/oders/">Oder list</Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title="Category" id="navbarScrollingDropdown">
                    {topCategoryList.map((res, index) =>
                      <NavDropdown.Item key={index} as={NavLink} to={`/s-category/${res.CATEGORY_CODE}`} >{res.CATOGARY_NAME}</NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/category" >
                      All Categories List
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={NavLink} to="/product" >Product</Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" >Contact Us</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {isLogin ? (
                <>
                  <h6 className='my-auto mx-2'></h6>
                  <NavDropdown title={'Hi: ' + user.name} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to={'/dash'}>Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/Settings" >
                      Settings
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button onClick={logout} variant="outline-primary">Logout</Button>{' '}
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/register" >Register</Nav.Link>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
