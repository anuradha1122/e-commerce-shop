import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../../services/Axios';
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus, faRotate, faEdit } from '@fortawesome/free-solid-svg-icons';
import DataService from '../../../services/Data-service';
import AuthService from '../../../services/Auth-service';
import DataContext from '../../../helpers/MyContext';

export default function ProductItem() {

  const navigate = useNavigate();

  const { setUpdateProductData  } =useContext(DataContext);

  const [productList, setProductList] = useState([]);

  const [messageDelet, setMessageDelete] = useState('');
  const [successfulDelete, setSuccessfulDelete] = useState(false);

  const fetchCategory = () => {
    DataService.getAllProductList().then((res) => {
      if (res) {
        setProductList(res);
      } else {
        setProductList([]);
      }
    })
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteHandle=(productCode)=>{
    DataService.deleteProduct(productCode).then((res)=>{
      console.log(productCode)
      if(res.error){
        setSuccessfulDelete(false);
        setMessageDelete(res.status);
      }else{
        setSuccessfulDelete(true);
        setMessageDelete(res.status);
        fetchCategory();
      }
    })
  }

  const newProductHandle=()=>{
    setUpdateProductData([]);
    navigate("/dash/add-product", {replace: true});
  };
  
  const updateHandle=(product)=>{
    if(product.ID){
      setUpdateProductData(product);
      navigate("/dash/add-product", {replace: true});
    }else{
      return;
    };
  };

  const PRE_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    //console.log('selected page: ', selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PRE_PAGE;
  const pageCount = Math.ceil(productList.length / PRE_PAGE);

  return (
    <div>
      <Container>
      {messageDelet && (
                <Alert className='p-2' variant={successfulDelete ? 'success' : 'danger'}>
                  <span style={{ fontSize: 12 }}>{messageDelet}</span>
                </Alert>
              )}
        <Table striped hover>
          <thead>
            <tr>
              <th>IMG</th>
              <th>Product CODE</th>
              <th>Product Name</th>
              <th>Short Discription</th>
              <th className='text-end'>Price(LKR)</th>
              <th> <Button onClick={()=>newProductHandle()} variant="outline-primary" className='float-end'><FontAwesomeIcon icon={faPlus} /></Button></th>
            </tr>
          </thead>
          <tbody>
            {productList.slice(offset, offset + PRE_PAGE)
              .map((res, index) =>
                <tr key={index}>
                  <td className="align-middle"><img src={axiosInstance.defaults.baseURL+res.IMG_URL} className="my-logo rounded float-start" /></td>
                  <td className="align-middle">{res.PRDUCT_CODE}</td>
                  <td className="align-middle">{res.PRODUCT_NAME}</td>
                  <td className="align-middle">{res.SHORT_DISCRIPTION}</td>
                  <td className="align-middle text-end">{(Math.round(res.PRICE * 100) / 100).toFixed(2)}</td>
                  <td className="align-middle">
                    <Button onClick={()=>deleteHandle(res.PRDUCT_CODE)} variant="link" className='float-end text-danger'><FontAwesomeIcon icon={faTrashCan} /></Button>
                    <Button onClick={()=>updateHandle(res)} variant="link" className='float-end text-primary'><FontAwesomeIcon icon={faEdit} /></Button>
                    </td>
                </tr>
              )}
          </tbody>
        </Table>
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
    </div>
  )
}

