import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Route, Routes } from "react-router-dom";
import Admin from './admin/Admin';
import User from './user/User';
import CatItem from './admin/category/CatItem';
import ProductItem from './admin/product/ProductItem';
import AddProduct from './admin/product/AddProduct';
import Brands from './admin/brands/Brands';
import PaymentConfirmation from './user/PaymentConfirmation';
import Oders from '../oders/Oders';

export default function Dashbord() {
    return (
        <Container fluid className='py-4 px-xl-5'>
                <Routes>
                    <Route path="/" element={<Admin />} />
                    <Route path="/profile" element={<Admin />} />
                    <Route path="/catitem" element={<CatItem />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/product" element={<ProductItem />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/oders/*" element={<Oders />} />
                </Routes>
        </Container>
    )
}
