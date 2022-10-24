import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import ReactPaginate from 'react-paginate';
import DataContext from '../helpers/MyContext';

export default function Category() {
    const { summeryCategoryList, loading } = useContext(DataContext);
    
    const PRE_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(0);
  
    function handlePageClick({ selected: selectedPage }) {
      //console.log('selected page: ', selectedPage);
      setCurrentPage(selectedPage);
    };
  
    const offset = currentPage * PRE_PAGE;
    const pageCount = Math.ceil(summeryCategoryList.length / PRE_PAGE);
    
    const currentPageData = summeryCategoryList.slice(offset, offset + PRE_PAGE)
      .map((res, index) =>
        <div key={index}>
          <Col className='my-2 d-flex align-items-stretch'><CategoryCard categoryData={res} /></Col>
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
