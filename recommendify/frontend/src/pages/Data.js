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
            <p>These are your top artists</p>
            {artistData.map(d => <p>{d.name}: {d.followers} followers</p>)}
            <p>These are your top tracks</p>
            {songData.map(d => <p>{d.name} by {d.artist}</p>)}
            <p>These are your recent listens</p>
            {recentTracks.map(d => <p>{d.name} {d.artist}</p>)}
            
        </div>
    )
}

export default Data;