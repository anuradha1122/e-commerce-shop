import React from 'react';
import { Card, Form, Button, Alert, Container, Spinner, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faYoutube, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight, faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
    return (
        <div>
            <Container fluid className='py-3 px-xl-5'>
                <h4 className="text-center my-5">Contact For Any Queries</h4>
                <Row>
                    <Col xs={12} md={6}>
                        <h4>Get In Touch</h4>
                        <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
                        <div className='py-3'>
                            <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                            <p className="text-primary mb-2"><FontAwesomeIcon className="me-3" icon={faMapMarkerAlt} />123 Street, New York, USA</p>
                            <p className="text-primary mb-2"><FontAwesomeIcon className="me-3" icon={faEnvelope} />info@example.com</p>
                            <p className="text-primary mb-0"><FontAwesomeIcon className="me-3" icon={faPhoneAlt} />+012 345 67890</p>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Your Email *</Form.Label>
                                <Form.Control type="text" placeholder="example@gmail.com" required isInvalid={false} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>

                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Your Name *</Form.Label>
                                <Form.Control type="text" placeholder="A.P.D Kumaran" required isInvalid={false} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Subject *</Form.Label>
                                <Form.Control type="text" placeholder="" required isInvalid={false} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Your Message *</Form.Label>
                                <Form.Control as="textarea" rows={3} required />
                            </Form.Group>

                            <Button className='my-3 float-end' variant="primary" type="submit">submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
