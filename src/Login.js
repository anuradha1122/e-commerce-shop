import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import { useNavigate, Link, Redirect } from "react-router-dom";
import AuthService from "./services/Auth-service";

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //alert(userName);
        setMessage("");
        setLoading(true);
        if(userName){
            AuthService.login( userName, password ).then((res) => {
                if(res.error){
                    setIsLogin(false);
                    setMessage(res.status);
                    //console.log(res.error);
                    setLoading(false);
                }else{
                    navigate("/dash", {replace: true});
                    //console.log(res);
                    setLoading(false);
                    //window.location.reload();
                }
                  
                },
                (error) => {
                    setIsLogin(false);
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
            } else {
              setLoading(false);
            }
        
    };

    return (
        <Container fluid className='py-1 px-xl-5'>
            <div className='login-form'>
            <h4 className='text-center p-2'>Login</h4>
            <Card className='bg-light'>
                <Card.Body>
                    <Alert variant='danger' className='p-2' show={!isLogin}>
                        <span style={{ fontSize: 12}}>{message}</span>
                    </Alert>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control onChange={(e) => setUserName(e.target.value)} value={userName} type="email" placeholder="Enter email" required isInvalid={false} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required isInvalid={false} />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 my-1' variant="primary" type="submit">
                        {loading ? (<><Spinner animation="border" size="sm" /> Login ...</>):('Sign in')}
                        </Button>
                        <Button className='w-100 my-1' variant="outline-secondary">Login with google</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className='mt-2'>
                <Card.Body><span style={{ fontSize: 14}}>Don't have an account? <Link to={'/register'}> Register</Link> now.</span></Card.Body>
            </Card>
        </div>
        </Container>
    )
}