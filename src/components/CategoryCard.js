import React from 'react';
import axiosInstance from '../services/Axios';
import { Card, Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import AuthService from '../services/Auth-service';
import { Link, NavLink, useNavigate } from "react-router-dom";


export default function CategoryCard(props) {
    const { categoryData } = props;

    const truncate=(str) => {
        return str.length > 20 ? str.substring(0, 15) + "..." : str;
    }

    return (
        <div>
            <Card className='h-100 w-100 card-i'>
                <Card.Body>
                    <Card.Title className='float-end text-muted'>Products ({categoryData.PRODUCT_COUNT})</Card.Title>
                </Card.Body>
                <Card.Link as={NavLink} to={`/s-category/${categoryData.CATEGORY_CODE}`}><Card.Img variant="top" src={axiosInstance.defaults.baseURL+ categoryData.IMG_URL} /></Card.Link>
                <Card.Body>
                    
                    <Card.Title className='text-truncate'> {truncate(categoryData.CATOGARY_NAME)} </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}
