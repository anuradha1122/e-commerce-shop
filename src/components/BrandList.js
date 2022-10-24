import React, { useContext } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Form, Pagination, Badge } from 'react-bootstrap';
import Slider from "react-slick";
import DataContext from '../helpers/MyContext';
import BrandCard from './BrandCard';

export default function BrandList() {
  const { brandsList } = useContext(DataContext);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="justify-content-md-center my-5">
        <Slider {...settings}>

          {brandsList.map((brand, index) => (
            <div key={index}>
              <BrandCard brand={brand} />
            </div>
          ))}

        </Slider>
      </div>
    </>
  )
}
