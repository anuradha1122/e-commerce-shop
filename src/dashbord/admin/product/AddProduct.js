import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Spinner, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import DataService from '../../../services/Data-service';
import DataContext from '../../../helpers/MyContext';

export default function AddProduct() {

  const { categoryList, brandsList, updateProductData } = useContext(DataContext);

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [shortDesc, setShrotDisc] = useState('');
  const [discription, setDiscription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [proSelectImgData, setProSelectImgData] = useState(null);

  useEffect(() => {
    if (updateProductData.ID) {
      setIsUpdate(true);
      setProductCode(updateProductData.PRDUCT_CODE);
      setProductName(updateProductData.PRODUCT_NAME);
      setCategory(updateProductData.CATEGORY_CODE);
      setShrotDisc(updateProductData.SHORT_DISCRIPTION);
      setDiscription(updateProductData.DISCRIPTION);
      setBrand(updateProductData.BRAND);
      setPrice(updateProductData.PRICE);

    } else {
      setIsUpdate(false);
    };
  }, []);

  const clearStates = () => {
    setProductName('');
    setCategory('');
    setShrotDisc('');
    setDiscription('');
    setBrand('');
    setPrice('');
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    setLoading(true);
    if(isUpdate){
      DataService.updateProduct(productName, category, shortDesc, discription, brand, price, productCode).then((res) => {
        if (res.error) {
          setMessage(res.status);
          setSuccessful(false);
          //console.log(res.status);
          setLoading(false);
        } else {
          setMessage(res.status);
          setSuccessful(true);
          //console.log(res.status);
          setLoading(false);
        }
      },(error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      });
    }else{
      DataService.uploadProductImg(proSelectImgData).then(res => { // then print response status
        //console.warn(res);
        if (res.error) {
          setMessage(res.status);
          setSuccessful(false);
          //console.log(res.status);
          setLoading(false);
        } else {
          const imgUrl = res.url;
          DataService.postProduct(productName, category, shortDesc, discription, brand, price, imgUrl).then((res) => {
            if (res.error) {
              setMessage(res.status);
              setSuccessful(false);
              console.log(res.status);
              setLoading(false);
            } else {
              setMessage(res.status);
              setSuccessful(true);
              console.log(res.status);
              setLoading(false);
              clearStates();
            }
          });
        }
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
      );
    }
    
  };

  return (
    <div>
      <Container>
        {isUpdate ?(<h4 className='text-start'>Update Product Details:({updateProductData.PRDUCT_CODE})</h4>
        ):(<h4 className='text-start'>Add New Product Details</h4>)}
        <Card>
          <Card.Body>
            {message && (
              <Alert className='p-2' variant={successful ? 'success' : 'danger'}>
                <span style={{ fontSize: 12 }}>{message}</span>
              </Alert>
            )}

            <Form className='my-4' onSubmit={handleSubmit}>
              <Row>
                <Col md={12} lg={6}>
                  <Form.Group className="mb-3" controlId="Form.ControlInput1">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} lg={6}>
                  <Form.Group className="mb-3" controlId="Form.ControlInput2">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select aria-label="Default select" type='select' required onChange={(e) => setCategory(e.currentTarget.value)} value={category} >
                      <option value="">Open this select</option>
                      {categoryList.map((res, index) =>
                        <option key={index} value={res.CATEGORY_CODE}>{res.CATOGARY_NAME}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="Form.ControlInput3">
                <Form.Label>Short Discription</Form.Label>
                <Form.Control as="textarea" rows={3}
                  required
                  value={shortDesc}
                  onChange={(e) => setShrotDisc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Form.ControlInput4">
                <Form.Label>Full Discription</Form.Label>
                <Form.Control as="textarea" rows={4}
                  required
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={6} lg={3}>
                  <Form.Group className="mb-3" controlId="Form.ControlInput5">
                    <Form.Label>Select Brand Name</Form.Label>
                    <Form.Select aria-label="Default select" type='select' required onChange={(e) => setBrand(e.currentTarget.value)} value={brand} >
                      <option value="" >Open this select</option>
                      {brandsList.map((res, index) =>
                        <option key={index} value={res.BRAND_CODE}>{res.BRAND_NAME}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                {isUpdate?(
                  <></>
                ):(
                  <>
                  <Col md={12} lg={6}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload image file</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      onChange={(e) => setProSelectImgData(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                  </>
                )}
              </Row>
              <div className='float-end'>
                <Button type="button" as={NavLink} to={'/dash/product'} variant="primary" className='me-2' >Back</Button>
                  <Button disabled={loading} type='submit' variant="primary"  >
                    {loading ? (<><Spinner animation="border" size="sm" /> Up Loading ...</>) : (
                      isUpdate? ('Update Data'):('Save Data')
                    )}
                  </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
