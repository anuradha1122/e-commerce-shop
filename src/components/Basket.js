import React, { useContext, useState } from 'react';
import axiosInstance from '../services/Axios';
import { Container, Row, Col, Button, Tabs, Tab, Form, Pagination, Table, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../helpers/MyContext';
import AuthService from '../services/Auth-service';
import { useNavigate } from "react-router-dom";

export default function Basket() {
  const navigate = useNavigate();
  
  const { cartItems, removeFromCart, qtyPlusItem, qtyMinusItem, addPayItem } = useContext(DataContext);
  const itemPrice = cartItems.reduce((a, c)=> a + (c.PRICE -(c.PRICE*c.DISCOUNT/100)) * c.qty, 0);
  const taxPrice = itemPrice * 0;
  const ShippingPrice = itemPrice > 5000 ? 0 : 50;
  const totalPrice = itemPrice + taxPrice + ShippingPrice;

  const payHandle =(cartItems)=>{
    if(cartItems){
      addPayItem(cartItems);
    }else{
      return
    }  
  }

  return (
    <div>
      <Container fluid className='py-5 px-xl-5'>
        <Container>
          {cartItems.length !== 0 &&
          <>
            <Table striped hover>
              <thead>
                <tr>
                  <th>IMG</th>
                  <th>Product CODE</th>
                  <th>Product Name</th>
                  <th className='text-end'>Quantity</th>
                  <th className='text-end'>Unit Price(LKR)</th>
                  <th className='text-end'>Price(LKR)</th>
                  <th className='text-end'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((res, index) =>
                  <tr key={index}>
                    <td className="align-middle"><img src={axiosInstance.defaults.baseURL+ res.IMG_URL} className="my-logo rounded float-start" /></td>
                    <td className="align-middle">{res.PRDUCT_CODE}</td>
                    <td className="align-middle">{res.PRODUCT_NAME}</td>
                    <td className="align-middle text-end">
                      
                      <ButtonGroup aria-label="Basic example" size="sm">
                        <Button variant="secondary" onClick={()=>qtyMinusItem(res.PRDUCT_CODE)} >-</Button>
                        <Button variant="secondary" disabled>{res.qty}</Button>
                        <Button variant="secondary" onClick={()=>qtyPlusItem(res.PRDUCT_CODE)} >+</Button>
                      </ButtonGroup>
                    </td>
                    <td className="align-middle text-end">{(Math.round(res.PRICE * 100) / 100).toFixed(2)}</td>
                    <td className="align-middle text-end">{(Math.round((res.PRICE * res.qty) * 100) / 100).toFixed(2)}</td>
                    <td className="align-middle"><Button onClick={() => removeFromCart(res)} variant="link" className='float-end text-danger'><FontAwesomeIcon icon={faTrashCan} /></Button></td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5} className="align-middle text-end py-3">Tax Price:</td>
                  <td className="align-middle text-end">{(Math.round(itemPrice * 100) / 100).toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={5} className="align-middle text-end py-3">Price:</td>
                  <td className="align-middle text-end">{(Math.round(taxPrice * 100) / 100).toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={5} className="align-middle text-end py-3">Shipping Cost:</td>
                  <td className="align-middle text-end">{(Math.round(ShippingPrice * 100) / 100).toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={5} className="align-middle text-end">Total Price:</td>
                  <td className="align-middle text-end"><h4>{(Math.round(totalPrice * 100) / 100).toFixed(2)}</h4></td>
                  <td className="align-middle text-end"></td>
                </tr>
                <tr>
                  <td colSpan={7} className="align-middle text-end"><Button onClick={() => payHandle(cartItems)} variant="outline-primary">Pay Now</Button></td>
                </tr>
              </tbody>
            </Table>
            </>
          }

          <h3 className='text-center'>{cartItems.length === 0 && <>You have no items in the cart!</>}</h3>

        </Container>
      </Container>
    </div>
  )
}
