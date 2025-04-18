import React, {useState, useEffect, useMemo} from "react";
import Header from '../components/header';

const Recommend = () => {
    //get top artist data
    const [artistData, setArtistData] = useState([]);
    //get top song data
    const [songData, setSongData] = useState([]);
    //get recent track data
    const [recentTracks, setRecentTracks] = useState([]);

    //populate spotify data once when page is rendered
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

    //using the data we get from spotify api to compile an array of the artists the user already listens to
    //helper function to find artists the user listens to
    const getListensTo = (artists, recents, tops) => {
        const listensToSet = new Set();
        artists.map(d => listensToSet.add(d.name));
        for(let i = 0; i < recents.length; i++) {
            (recents[i].artist).map(d => listensToSet.add(d));
        }
        for(let i = 0; i < tops.length; i++) {
            (tops[i].artist).map(d => listensToSet.add(d));
        }
        // console.log(listensToSet);
        return Array.from(listensToSet);
    }

    //when we get the data from spotify, populate userListensTo with the names of the artists the user listens to
    const userListensTo = useMemo(
        () => getListensTo(artistData, recentTracks, songData),
        [artistData, recentTracks, songData]
    );

    //for each artist in userListensTo, find the similar artists 
    //helper function to get similar artists
    async function getSimilar (artists) {
        const similarSet = new Set();
        const userListens = new Set(artists);
        // console.log("userListens:")
        // console.log(userListens);
        for(let i = 0; i < artists.length; i++) {
            const url = 'lastfm/similar-artists?q=' + encodeURIComponent(artists[i]);
            let response = await fetch(url);
            let result = await response.json();
            if(result.error) {
                continue;
            }
            result.similar_artists.forEach(d => {
                if(!userListens.has(d.artist)) { //because we don't want to add artists that a user already listens to
                    similarSet.add(d.artist);
                }
            });
        }
        // console.log("getting similar now:");
        // console.log(similarSet);
        return Array.from(similarSet);
    }

    const [similarArtists, setSimilarArtists] = useState([]);

    //once userListensTo changes/updates then also update similarArtists:
    useEffect(() => {
        const fetchSimilar = async () => {
            const result = await getSimilar(userListensTo);
            setSimilarArtists(result);
        };
    
        if (userListensTo.length > 0 && userListensTo.length >= artistData.length) {
            fetchSimilar();
        }
    }, [userListensTo]);

    //list of songs that's going to get passed to open ai api
    const [songList, setSongList] = useState([]);

    //helper function to populate songList
    const getSongList = async(artists) => {
        const songSet = new Set();
        for(let i = 0; i < artists.length; i++) {
            const url = "spotify/artist-top-tracks?q=" + encodeURIComponent(artists[i]);
            let response = await fetch(url);
            let result = await response.json();
            if(result.error) {
                continue;
            }
            result.forEach((r) => {
                let songInfo = r.name + " by ";
                for(let j = 0; j < r.artist.length; j++) {
                    if(j > 0) {
                        songInfo += ", ";
                    }
                    songInfo += r.artist[j];
                }
                console.log(songInfo);
                songSet.add(songInfo);
            });
        }
        console.log(songSet);
        return Array.from(songSet);
    };

    //when we have our list of similar artists, then we can get the songs of those artists to pass to openai
    useEffect(() => {
        const fetchSongList = async () => {
            const result = await getSongList(similarArtists);
            setSongList(result);
        };

        if (similarArtists.length > 2*userListensTo.length) {
            fetchSongList();
        }
    }, [similarArtists]);

    return (
        <div>
            <Header showConnectButton={false} />
            <h3>This is the full list of recommended songs:</h3>
            {songList.map((d, index) => <p key={index}>{d}</p>)}
        </div>
    );
}

export default Recommend;