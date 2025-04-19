import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './headerStyles.css'
import SpotifyIcon from './SpotifyIcon.png'

function Header({url, showConnectButton = true }) {
    const s = "Connect Account "
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className ="mb-0 h1" href="">Recommendify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Features</Nav.Link>
            <Nav.Link href="">About Us</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
              {showConnectButton && (
                <Button href={url} variant="success">
                    {s}
                    <Image src={SpotifyIcon} alt="Spotify Logo png" border="0" width="25" height="25" ></Image>
                </Button>
              )}
          </Nav>
        </Container>
        </Navbar>
        <br/>
        </>
    )
}

export default Header;
