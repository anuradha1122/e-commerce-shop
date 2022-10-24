import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import ProductCard from './ProductCard';
import DataService from '../services/Data-service';
import ReactPaginate from 'react-paginate';
import DataContext from '../helpers/MyContext';
import {
    generatePath,
    Switch,
    Route,
    useHistory,
    useParams
} from "react-router-dom";
import { useLocation } from "react-router";

export default function SCategory() {

      //Scroll To Top on Route Change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])
  //-------------------------------
  
    const { id } = useParams('');
    const { producstList, loading } = useContext(DataContext);
    const result = producstList.filter(cat => cat.CATEGORY_CODE === id);

    const PRE_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        //console.log('selected page: ', selectedPage);
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PRE_PAGE;
    const pageCount = Math.ceil(result.length / PRE_PAGE);

    const currentPageData = result.slice(offset, offset + PRE_PAGE)
        .map((res, index) =>
            <div key={index}>
                <Col className='my-2 d-flex align-items-stretch'><ProductCard productData={res} /></Col>
            </div>
        );

    return (
        <Container fluid className='py-3 px-xl-5'>

            {loading && (<div className='text-center m-5'>loading..</div>)}
            <Row xs={2} md={4} lg={5}>
                {currentPageData}
            </Row>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={'pagination pagination-sm d-flex justify-content-center my-3'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                activeClassName={'page-item active'}
                activeLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
            />
        </Container>
    )
}


