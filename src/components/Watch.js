import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Tabs, Tab, Form, Pagination, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../helpers/MyContext';
import AuthService from '../services/Auth-service';

export default function Watch() {

    const { watchList, removeFromWatch } =useContext(DataContext);

  return (
    <div>
        <Container fluid className='py-5 px-xl-5'>
        <Container>
        {watchList.length !== 0 && 
        <Table striped hover>
        <thead>
          <tr>
            <th>IMG</th>
            <th>Product CODE</th>
            <th>Product Name</th>
            <th className='text-end'>Unit Price(LKR)</th>
            <th className='text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((res, index) =>
              <tr key={index}>
                <td className="align-middle"><img src={AuthService.API_URL+ res.IMG_URL} className="my-logo rounded float-start" /></td>
                <td className="align-middle">{res.PRDUCT_CODE}</td>
                <td className="align-middle">{res.PRODUCT_NAME}</td>
                <td className="align-middle text-end">{(Math.round(res.PRICE * 100) / 100).toFixed(2)}</td>
                <td className="align-middle text-end">
                  <Button type="link" variant="link" className='text-primary' as={NavLink} to={`/product/${res.PRDUCT_CODE}`} ><FontAwesomeIcon icon={faEye} /></Button>
                  <Button onClick={() => removeFromWatch(res.PRDUCT_CODE)} variant="link" className='text-danger'><FontAwesomeIcon icon={faTrashCan} /></Button>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
        }
  
      <h3 className='text-center'>{watchList.length === 0 && <>You have no items in the watch !</>}</h3>
    
        </Container>
        </Container>
    </div>
  )
}

