import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
return (
    <>
    <footer className ="bg-light text-center text-lg-start">
        <Container>
            <br/>
            <Row>
                <Col>
                    <h4>Recommendations <br/> just for you!</h4>
                    <p>Get new songs now.</p>
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <h6>Sitemap</h6>
                            <ul className="list-unstyled mb-0">
                                <li>About us</li>
                                <li>Features</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                        <Col>
                            <h6>Socials</h6>
                            <ul className="list-unstyled mb-0">
                                <li>Instagram</li>
                                <li>Facebook</li>
                                <li>Linkedin</li>
                            </ul>
                        </Col>
                        <Col>
                            <h6>Support</h6>
                            <ul className="list-unstyled mb-0">
                                <li>Help Center</li>
                                <li>FAQs</li>
                                <li>Pricing</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
        </Container>
        <div className="text-center p-3 bg-light text-align-left">
        All rights reserved &nbsp;&nbsp;&nbsp;&nbsp; Terms Privacy Cookies 
        </div>
    </footer>
    </>
);
};

export default Footer;