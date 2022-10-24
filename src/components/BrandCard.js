import React from 'react';
import axiosInstance from '../services/Axios';

export default function BrandCard(props) {
    const brand = props;
    return (
        <div className="card m-1">
            <div className="card-body text-center">
                <img className="card-img" src={axiosInstance.defaults.baseURL+ brand.brand.IMG_URL} alt="" />
            </div>
        </div>
    )
}
