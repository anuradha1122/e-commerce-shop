import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Container, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import DataService from '../../../services/Data-service';
import axiosInstance from '../../../services/Axios';

export default function CatItem() {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleClose = () => {
    setIsUpdate(false);
    setCatName("");
    setCatSelectImgData(null);
    setMessage("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [categoryList, setCategoryList] = useState([]);

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const [catName, setCatName] = useState("");
  const [catCode, setCatCode] = useState("");
  const [catSelectImgData, setCatSelectImgData] = useState(null);

  const [messageDelet, setMessageDelete] = useState('');
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    setLoading(true);
    DataService.uploadCategoryImg(catSelectImgData).then(res => {
      //console.warn(res);
      if (res.error) {
        setMessage(res.status);
        setSuccessful(false);
        //console.log(res.status);
        setLoading(false);
      } else {
        const imgUrl = res.url;
        DataService.postCategory(catName, imgUrl).then((res) => {
          if (res.error) {
            setMessage(res.status);
            setSuccessful(false);
            //console.log(res.status);
            setLoading(false);
          } else {
            setMessage(res.status);
            setSuccessful(true);
            //console.log(res.status);
            setLoading(false);
            fetchCategory();
          }
        })
      }
    }, (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      setMessage(resMessage);
    }
    );
  }

  const fetchCategory = () => {
    DataService.getAllCatogaryList().then((res) => {
      if (res) {
        setCategoryList(res);
      } else {
        setCategoryList([]);
      }
    })
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteHandle=(catCode)=>{
    DataService.deleteCategory(catCode).then((res)=>{
      console.log(catCode)
      if(res.error){
        setSuccessfulDelete(false);
        setMessageDelete(res.status);
      }else{
        setSuccessfulDelete(true);
        setMessageDelete(res.status);
        fetchCategory();
      }
    })
  };

  const updadeShowHandle=(res)=>{
    setCatCode(res.CATEGORY_CODE);
    setCatName(res.CATOGARY_NAME);
    setIsUpdate(true);
    setShow(true);
  };

  const handleUpdate=(e)=>{
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    setLoading(true);

    DataService.updateCategory(catCode, catName ).then((res) => {
      if (res.error) {
        setMessage(res.status);
        setSuccessful(false);
        //console.log(res.status);
        setLoading(false);
      } else {
        setMessage(res.status);
        setSuccessful(true);
        //console.log(res.status);
        setLoading(false);
        fetchCategory();
      }
     }, (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      setMessage(resMessage);
    }
    );

  };

  const PRE_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    //console.log('selected page: ', selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PRE_PAGE;
  const pageCount = Math.ceil(categoryList.length / PRE_PAGE);

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
              <th>Category CODE</th>
              <th>Category Name</th>
              <th> <Button onClick={handleShow} variant="outline-primary" className='float-end'><FontAwesomeIcon icon={faPlus} /></Button></th>
            </tr>
          </thead>
          <tbody>
            {categoryList.slice(offset, offset + PRE_PAGE)
              .map((res, index) =>
                <tr key={index}>
                  <td className="align-middle"><img src={axiosInstance.defaults.baseURL + res.IMG_URL} className="my-logo rounded float-start" /></td>
                  <td className="align-middle">{res.CATEGORY_CODE}</td>
                  <td className="align-middle">{res.CATOGARY_NAME}</td>
                  <td className="align-middle">
                    <Button onClick={()=>deleteHandle(res.CATEGORY_CODE)} variant="link" className='float-end text-danger'><FontAwesomeIcon icon={faTrashCan} /></Button>
                    <Button onClick={()=>updadeShowHandle(res)} variant="link" className='float-end text-primery'><FontAwesomeIcon icon={faEdit} /></Button>
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
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {isUpdate? (
              <Modal.Title>Category Update ({catCode})</Modal.Title>
            ):(
<             Modal.Title>Add New Category</Modal.Title>
            )}
            
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {message && (
                <Alert className='p-2' variant={successful ? 'success' : 'danger'}>
                  <span style={{ fontSize: 12 }}>{message}</span>
                </Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Category name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={catName}
                  required
                  onChange={(e) => setCatName(e.target.value)}
                />
              </Form.Group>
              {isUpdate? (<></>):(
                <Form.Group className="mb-3">
                <Form.Label>Select images file</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => setCatSelectImgData(e.target.files[0])}
                />
              </Form.Group>
              )}
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {isUpdate?(
                <Button onClick={handleUpdate} disabled={loading} type='button' variant="primary">
                {loading ? (<><Spinner animation="border" size="sm" /> Updting...</>) : ('Update Data')}
              </Button>
              ):(
                <Button disabled={loading} type='submit' variant="primary">
                {loading ? (<><Spinner animation="border" size="sm" /> Up Loading ...</>) : ('Save')}
              </Button>
              )}
              
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </div>
  )
}
