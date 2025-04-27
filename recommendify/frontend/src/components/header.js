import React, { useState, useEffect} from 'react'
import {Nav, Navbar, Container, Button, Image, Dropdown} from 'react-bootstrap';
import './headerStyles.css'
import SpotifyIcon from './SpotifyIcon.png'

function Header({url, showConnectButton}) {
    const s = "Connect Account "
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className ="mb-0 h1" href="/">Recommendify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/about-us">About Us</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
              {showConnectButton ? (
                <Button href={url} variant="success">
                    {s}
                    <Image src={SpotifyIcon} alt="Spotify Logo png" border="0" width="25" height="25" ></Image>
                </Button>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Menu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="/similar-artists">Similar Artists</Dropdown.Item>
                  <Dropdown.Item href="/recommendations">Song Recommendations</Dropdown.Item>
                  <Dropdown.Item href="/spotify-data">Your Data</Dropdown.Item>
                  <Dropdown.Item href="#/action-5">Settings</Dropdown.Item>
                  <Dropdown.Item href="#/action-6">Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              )}
          </Nav>
        </Container>
        </Navbar>
        <br/>
        </>
    )
}

export default Header;
