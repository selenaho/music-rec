import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import './HeroStyles.css'
import iphone from './iphone_spotify.png'
import PinkFloyd from './Pink-Floyd-Dark-Side-of-the-Moon.webp'
import SongCard from './SongCard';

function Frontground() {
    return (
        <section>
            <Container fluid>
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
        <>
        <SongCard albumCover  = {PinkFloyd} artistName={'Pink Floyd'} songTitle = {"Us and Them"}/>
        {/* <SongCard albumCover  = {PinkFloyd} artistName={'Pink Floyd'} songTitle = {"Us and Them"}/>
        <SongCard albumCover  = {PinkFloyd} artistName={'Pink Floyd'} songTitle = {"Us and Them"}/>
        <SongCard albumCover  = {PinkFloyd} artistName={'blah blah blah blah blah'} songTitle = {"long title long title long title long title long title long title"}/> */}
        </>
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