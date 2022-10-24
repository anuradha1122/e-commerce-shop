import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../../helpers/MyContext';
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthService from '../../services/Auth-service';
import DataService from '../../services/Data-service';
import { Container, Spinner, Alert, Card, Table, Row, Col, Button, ButtonGroup, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';

export default function PaymentConfirmation(props) {
  const { payItemList } = useContext(DataContext);
  //console.log(payItemList);
  const navigate = useNavigate();

  const itemPrice = payItemList.reduce((a, c) => a + (c.PRICE - (c.PRICE * c.DISCOUNT / 100)) * c.qty, 0);
  const taxPrice = itemPrice * 0;
  const ShippingPrice = itemPrice > 5000 ? 0 : 50;
  const totalPrice = itemPrice + taxPrice + ShippingPrice;

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo1, setContactNo1] = useState('');
  const [contactNo2, setContactNo2] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [homeTown, setHomeTown] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethord, setPaymentMethord] = useState('');

  const [erorr, setErorr] = useState(false);
  const [stepOne, setStepOne] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    setErorr(false);
    setLoading(true);
    const itemData = {
      "firstName": firstName,
      "lastName": lastName,
      "contactNo1": contactNo1,
      "contactNo2": contactNo2,
      "email": email,
      "addressLine1": addressLine1,
      "addressLine2": addressLine2,
      "homeTown": homeTown,
      "zipCode": zipCode,
      "paymentMethord": paymentMethord,
      "item": payItemList,
      "itemPrice": itemPrice,
      "taxPrice": taxPrice,
      "ShippingPrice": ShippingPrice,
      "totalPrice": totalPrice,
    }
    //alert(JSON.stringify(itemData));
    if (stepOne) {
      DataService.postOders(itemData).then((res) => {
        if (res.error) {
          setMessage(res.status);
          setSuccessful(false);
          setErorr(true);
          //console.log(res.status);
          setLoading(false);
        } else {
          setMessage(res.status);
          setSuccessful(true);
          setErorr(false);
          //console.log(res.status);
          setLoading(false);
        }
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setErorr(true);

      }
      );
    } else {
      setStepOne(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function asyncCall() {
      if (itemPrice <= 0) {
        navigate("/", { replace: true });
      }
    }
    asyncCall();
  }, []);

  const handleBack = () => {
    if (successful) {
      navigate("/", { replace: true });
    } else {
      setStepOne(false);
    }
  };

  const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
  }

  return (
    <div id='printablediv'>
      <Container className='py-5 px-xl-5'>
        <h4 className='text-center pb-4'>Payment Confirmation</h4>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {!stepOne ? (
                <Row className='mb-4' >
                  <Col sm>
                    <Card.Title>Contact Ditails</Card.Title>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="formFirstName">
                          <Form.Control type="text" placeholder="First Name" onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName} required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formLastName">
                          <Form.Control type="text" placeholder="Last Name" onChange={(e) => setLastName(e.currentTarget.value)} value={lastName} required />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control type="text" placeholder="Email ID" onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="formContactNo1">
                          <Form.Control type="text" placeholder="Contact Number" onChange={(e) => setContactNo1(e.currentTarget.value)} value={contactNo1} required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formContactNo2">
                          <Form.Control type="text" placeholder="Contact Number" onChange={(e) => setContactNo2(e.currentTarget.value)} value={contactNo2} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm>
                    <Card.Title>Shipping address</Card.Title>
                    <Form.Group className="mb-3" controlId="formAddressLine1">
                      <Form.Control type="text" placeholder="Address Line 1" onChange={(e) => setAddressLine1(e.currentTarget.value)} value={addressLine1} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddressLine2">
                      <Form.Control type="text" placeholder="Address Line 2" onChange={(e) => setAddressLine2(e.currentTarget.value)} value={addressLine2} required />
                    </Form.Group>
                    <Row>
                      <Col sm={8}>
                        <Form.Group className="mb-3" controlId="formHomeTown">
                          <Form.Control type="text" placeholder="Home Town" onChange={(e) => setHomeTown(e.currentTarget.value)} value={homeTown} required />
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group className="mb-3" controlId="formZipCode">
                          <Form.Control type="text" placeholder="Zip Code" onChange={(e) => setZipCode(e.currentTarget.value)} value={zipCode} required />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : (
                <Row className='my-4'>
                  <Col sm>
                    <Card.Title>Customer</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{firstName + ' ' + lastName}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{contactNo1 + contactNo2}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                  </Col>
                  <Col sm>
                    <Card.Title>Shipping address</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{addressLine1 + ', ' + addressLine2}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{homeTown + '-' + zipCode}</Card.Subtitle>
                  </Col>
                </Row>
              )}

              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Discription</th>
                    <th className="align-middle text-end">Unit Price</th>
                    <th className="align-middle text-center">Qty</th>
                    <th className="align-middle text-end">Price($) </th>
                  </tr>
                </thead>
                <tbody>
                  {payItemList.map((res, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{res.PRDUCT_CODE + '-' + res.PRODUCT_NAME}</td>
                      <td className="align-middle text-end">{(Math.round(res.PRICE * 100) / 100).toFixed(2)}</td>
                      <td className="align-middle text-center">{res.qty}</td>
                      <td className="align-middle text-end">{(Math.round((res.PRICE * res.qty) * 100) / 100).toFixed(2)}</td>
                    </tr>
                  )}

                  <tr>
                    <td colSpan={4} className="align-middle text-end">Price:</td>
                    <td className="align-middle text-end">{(Math.round(itemPrice * 100) / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="align-middle text-end">Tax Price:</td>
                    <td className="align-middle text-end">{(Math.round(taxPrice * 100) / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="align-middle text-end">Shipping Cost:</td>
                    <td className="align-middle text-end">{(Math.round(ShippingPrice * 100) / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="align-middle text-end">Total Price:</td>
                    <td className="align-middle text-end"><h4>{(Math.round(totalPrice * 100) / 100).toFixed(2)}</h4></td>
                  </tr>
                </tbody>
              </Table>
              {!stepOne ? (
                <div className='my-2'>
                  <Card.Title>Payment methods</Card.Title>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label={<img src={process.env.PUBLIC_URL + '/images/payment-m/pay-a.png'} alt="..." />}
                      name="group1"
                      type='radio'
                      id={1}
                      onChange={(e) => setPaymentMethord(e.currentTarget.value)} value={'Visa'}
                      required
                    />
                    <Form.Check
                      inline
                      label={<img src={process.env.PUBLIC_URL + '/images/payment-m/pay-b.png'} alt="..." />}
                      name="group1"
                      type='radio'
                      id={2}
                      onChange={(e) => setPaymentMethord(e.currentTarget.value)} value={'Master'}
                      required
                    />
                    <Form.Check
                      inline
                      name="group1"
                      label={<img src={process.env.PUBLIC_URL + '/images/payment-m/pay-c.png'} alt="..." />}
                      type='radio'
                      id={3}
                      onChange={(e) => setPaymentMethord(e.currentTarget.value)} value={'PayPal'}
                      required
                    />
                  </div>
                  <div className='my-4'>
                    <Form.Check type={'checkbox'} label={'Why Do I Need a Privacy Policy Statement?'} required />
                  </div>
                </div>
              ) : (<></>)}

              {successful && <Alert variant='success' className='p-2'><span style={{ fontSize: 12 }}>{message}</span></Alert>}
              {erorr && <Alert variant='danger' className='p-2'><span style={{ fontSize: 12 }}>{message}</span></Alert>}

              <Button type='submit' className='float-end mx-1' disabled={loading || successful} >{loading ? (<><Spinner animation="border" size="sm" /> Data sending ...</>) : (stepOne ? ('Pay') : ('Confirm'))}</Button>
              {stepOne && <Button onClick={handleBack} type='button' className='float-end mx-1' disabled={loading} >{loading ? (<><Spinner animation="border" size="sm" /> Please wait ...</>) : ('Back')}</Button>}
              {successful && <Button onClick={Print} type='button' className='float-end mx-1'>Print</Button>}
            </Form>
          </Card.Body>
        </Card>
        
      </Container>
    </div>
  )
}

