import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';
import DataContext from '../helpers/MyContext';
import ProductCard from './ProductCard';

export default function TopProductList() {
  const { topProductList, loading } = useContext(DataContext);

  return (
    <>
    {loading && (<div className='text-center m-5'>loading..</div>)}
      <Row xs={2} md={4} lg={5}>
        {topProductList.map((res, index) =>
          <div key={index}>
            <Col className='my-2 d-flex align-items-stretch'><ProductCard productData={res} /></Col>
          </div>
        )}
      </Row>
    </>
  )
}
