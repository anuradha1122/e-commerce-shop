import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';
import DataContext from '../helpers/MyContext';
import CategoryCard from './CategoryCard';

export default function TopCategoryList() {
  const { topCategoryList, loading } = useContext(DataContext);

  return (
    <>
      {loading && (<div className='text-center m-5'>loading..</div>)}
      <Row xs={2} md={4} lg={5}>
        {topCategoryList.map((res, index) =>
          <div key={index}>
            <Col className='my-2 d-flex align-items-stretch'><CategoryCard categoryData={res} /></Col>
          </div>
        )}
      </Row>
    </>
  )
}
