import React from 'react'

import './HeroStyles.css'
import iphone from './iphone_spotify.png'

function Hero() {
    return (
        <section>
            <div className="container-fluid">
            <div className="hero-content">
            <div className="card text-bg-light mb-3 text-center">
                <div className="card-body">
                    <h1 class="card-title">Welcome to Recommendify</h1>
                    <h5 class="card-text">Discover your next favorite song</h5>
                </div>
                <img src={iphone} class="img-thumbnails mx-auto" alt="..."></img>
            </div>
            </div>
            </div>
        </section>
    )
}
export default Hero