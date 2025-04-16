import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import './HeroStyles.css'
import iphone from './iphone_spotify.png'

import SongCard from './SongCard';

function Frontground() {
    return (
        <section>
            <Container className="container-fluid">
                <Card className="card text-bg-light mb-3 text-center">
                    <Card.Body>
                        <Card.Title> Welcome to Recommendify </Card.Title>
                        <Card.Text>Discover your next favorite song</Card.Text>
                    </Card.Body>
                    <Image className="img-thumbnails mx-auto" src={iphone}></Image>
                </Card>
            </Container>
        </section>
    )
}
function Background(){
    return(
        <SongCard/>
    )
}

function Hero(){
    return(
        <>
        <div className='Hero'>
        <div className="background-layer">
            <Background/>
        </div>
        <div className="foreground-layer">
            <Frontground/>
        </div>
        </div>
        </>
    )
}
export default Hero