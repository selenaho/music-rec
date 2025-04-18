import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "./SongCardStyles.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function SongCard({ albumCover, artistName, songTitle }){
    return(
        <>
        <Container fluid>
            <div className="responsive-card">
            <Card>
                <Card.Body>
                <Row xs ='auto'>
                    <Col><Image src={albumCover} alt={`${songTitle} album cover`} className="album-cover" /></Col>
                    <Col>
                        <Row className="song-title text-truncate">
                            {songTitle}
                        </Row>
                        <Row className="artist-name text-truncate">
                            {artistName}
                        </Row>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </div>
        </Container>
        </>
    );
};

export default SongCard