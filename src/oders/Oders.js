import React from 'react';
import { Container, Spinner, Alert, Card, Table, Row, Col, Button, ButtonGroup, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';
import { Route, Routes, useLocation} from "react-router-dom";
import Invoice from './Invoice';
import InvoiceList from './Invoice-list';

export default function Oders() {
  return (
    <Container className='py-5 px-xl-5'>
        <Routes>
        <Route exact path="/" element={<InvoiceList />} />
        <Route exact path="/invoice" element={<Invoice />} />
        </Routes>
    </Container>
  )
}
