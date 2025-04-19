import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

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
                    <Image className="img-thumbnails mx-auto anim" src={iphone}></Image>
                </Card>
            </Container>
        </section>
    )
}

function Background(){
    return(
        <>
        <Container fluid>
            <SongCard className = "song-1" albumCover  = {PinkFloyd} artistName={'Pink Floyd'} songTitle = {"Us and Them"}/>
        </Container>
        
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

const HeroCarousel = () => {
    return (
        <Carousel 
        data-bs-theme="dark"
        wrap = {true}
        interval = {10000}
        prevIcon={<span className="custom-carousel-arrow-left">{'<'}</span>}
        nextIcon={<span className="custom-carousel-arrow-right">{'>'}</span>}>
            <Carousel.Item>
                <div className="carousel-slide">
                    <h3>Find your next favorite song without even trying</h3>
                    <p>Recommendify takes the music you already love and gives you a list of songs from artists that are similar* to the artists you already listen to.</p>
                    <p>Discover more music made for you.</p>
                    <p> </p>
                    <p> </p>
                    <small>* according to last.fm</small>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="carousel-slide">
                    <h3>Powered by Spotify + Last.fm</h3>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default Hero
export { HeroCarousel };