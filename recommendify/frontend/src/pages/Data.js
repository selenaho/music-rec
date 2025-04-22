import React, { useState, useEffect } from 'react';
import Header from '../components/header';

function Data(){
    //get top artist data
    const [artistData, setArtistData] = useState([]);
    //get top song data
    const [songData, setSongData] = useState([]);
    //get recent track data
    const [recentTracks, setRecentTracks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const artistResponse = await fetch('spotify/top-artists');
            const artistResult = await artistResponse.json();
            //console.log("result:")
            setArtistData(artistResult);
            //console.log(artistResult);

            const songResponse = await fetch('spotify/top-tracks');
            const songResult = await songResponse.json();
            setSongData(songResult);

            const recentResponse = await fetch('spotify/recently-played');
            const recentResult = await recentResponse.json();
            setRecentTracks(recentResult);
        };
        fetchData();
    }, []);

    

    return(
        <div>
            <Header showConnectButton={false} />
            <h3>These are your top artists</h3>
            {artistData.map(d => <p>&nbsp;{d.name}: {d.followers} followers</p>)}
            <h3>These are your top tracks</h3>
            {songData.map(d => <p>&nbsp;{d.name} by {d.artist}</p>)}
            <h3>These are your recent listens</h3>
            {recentTracks.map(d => <p>&nbsp;{d.name} {d.artist}</p>)}
            
        </div>
    )
}

export default Data;