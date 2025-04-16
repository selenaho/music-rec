import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function SongCard({ albumCover, artistName, songTitle }){
    return(
        <>
        <Container>
            <Card>
                <Card.Body>
                <img src={albumCover} alt={`${songTitle} album cover`} className="album-cover" />
                <div className="song-info">
                    <h3 className="song-title">{songTitle}</h3>
                    <p className="artist-name">{artistName}</p>
                </div>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default SongCard