import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../services/Axios';
import { Card, Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faMagnifyingGlass, faEye, faHeartO } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useNavigate } from "react-router-dom";
import DataContext from '../helpers/MyContext';
import AuthService from '../services/Auth-service';

export default function ProductCard(props) {
    const { productData } = props;

    return (
        <>
                <Card className='h-100 card-i'>
                <Card.Link as={NavLink} to={`/product/${productData.PRDUCT_CODE}`}><Card.Img variant="top hover-zoom" src={axiosInstance.defaults.baseURL+productData.IMG_URL} /></Card.Link>
                <Card.Body>
                    <Card.Subtitle className="card-sub-title mb-2 text-muted text-uppercase">Catogary</Card.Subtitle>
                    <Card.Title className='text-truncate'>{productData.PRODUCT_NAME}</Card.Title>
                    
                    <Card.Text className='card-sub-disc'>
                        {productData.SHORT_DISCRIPTION}
                    </Card.Text>
                    <Card.Title className="mb-2">$ {(Math.round(productData.PRICE * 100) / 100).toFixed(2)}</Card.Title>
                </Card.Body>
            </Card>
        </>
    )
}
