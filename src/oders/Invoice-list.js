import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../services/Axios';
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPlus, faRotate, faEdit, faVcard } from '@fortawesome/free-solid-svg-icons';
import DataService from '../services/Data-service';
import DataContext from '../helpers/MyContext';
import { faReddit } from '@fortawesome/free-brands-svg-icons';

export default function InvoiceList() {

  const navigate = useNavigate();

  const { setUpdateProductData  } =useContext(DataContext);

  const [odersList, setOdersList] = useState([]);

  const [messageDelet, setMessageDelete] = useState('');
  const [successfulDelete, setSuccessfulDelete] = useState(false);

  const fetchOders = () => {
    DataService.getAllOderList().then((res) => {
      if (res.error) {
        setOdersList([]);
        //console.log(res.error)
      } else {
        setOdersList(res.invoice_data);
        //console.log(res.invoice_data)
      }
    })
  }

  useEffect(() => {
    fetchOders();
  }, []);

  const viewHandle=(productCode)=>{
    alert('Hi..')
  }

  const newProductHandle=()=>{
    setUpdateProductData([]);
    navigate("/dash/add-product", {replace: true});
  };

  const PRE_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    //console.log('selected page: ', selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PRE_PAGE;
  const pageCount = Math.ceil(odersList.length / PRE_PAGE);

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
              <th>Invoice NO</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Request Date</th>
              <th className='text-end'>Price(LKR)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {odersList.slice(offset, offset + PRE_PAGE)
              .map((res, index) =>
                <tr key={index}>
                  <td className="align-middle">{res.INVOICE_NO}</td>
                  <td className="align-middle">{res.NAME}</td>
                  <td className="align-middle">{res.CONTACT_1}</td>
                  <td className="align-middle">{res.REQUEST_DATE}</td>
                  <td className="align-middle text-end">{(Math.round(res.TOTAL_PRICE * 100) / 100).toFixed(2)}</td>
                  <td className="align-middle">
                    <Button onClick={()=>viewHandle(res.INVOICE_NO)} variant="link" className='float-end text-dark'><FontAwesomeIcon icon={faVcard} /></Button>
                    <Button onClick={()=>viewHandle(res.INVOICE_NO)} variant="link" className='float-end text-dark'><FontAwesomeIcon icon={faReddit} /></Button>
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


