import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
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
