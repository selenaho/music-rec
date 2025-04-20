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
    const getListensTo = () => {
        const listensToSet = new Set();
        artistData.map(d => listensToSet.add(d.name));
        for(let i = 0; i < songData.length; i++) {
            (songData[i].artist).map(d => listensToSet.add(d));
        }
        for(let i = 0; i < recentTracks.length; i++) {
            (recentTracks[i].artist).map(d => listensToSet.add(d));
        }
        // console.log(listensToSet);
        return Array.from(listensToSet);
    }

    //when we get the data from spotify, populate userListensTo with the names of the artists the user listens to
    const userListensTo = useMemo(
        () => {
            if(artistData && recentTracks && songData) {
                return getListensTo();
            }
            else {
                return [];
            }
            
        },
        [artistData, recentTracks, songData]
    );

    //for each artist in userListensTo, find the similar artists 
    //helper function to get similar artists
    async function getSimilar () {
        const similarSet = new Set();
        const userListensToSet = new Set(userListensTo);
        // console.log("userListens:")
        // console.log(userListens);
        for(let i = 0; i < userListensTo.length; i++) {
            const url = 'lastfm/similar-artists?q=' + encodeURIComponent(userListensTo[i]);
            let response = await fetch(url);
            let result = await response.json();
            if(result.error) {
                continue;
            }
            result.similar_artists.forEach(d => {
                if(!userListensToSet.has(d.artist)) { //because we don't want to add artists that a user already listens to
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
            const result = await getSimilar();
            setSimilarArtists(result);
        };
    
        if (userListensTo.length > 0 && userListensTo.length >= artistData.length) {
            fetchSimilar();
        }
    }, [userListensTo]);

    //list of songs that's going to get passed to open ai api
    const [songList, setSongList] = useState([]);

    //helper function to populate songList
    const getSongList = async() => {
        //console.log("getting song list");
        const songSet = new Set();
        for(let i = 0; i < similarArtists.length; i++) {
            const url = "spotify/artist-top-tracks?q=" + encodeURIComponent(similarArtists[i]);
            //console.log(url);
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
                //console.log(songInfo);
                songSet.add(songInfo);
            });
        }
        console.log(songSet);
        return Array.from(songSet);
    };

    //when we have our list of similar artists, then we can get the songs of those artists to pass to openai
    useEffect(() => {
        const fetchSongList = async () => {
            const result = await getSongList();
            setSongList(result);
        };

        if (similarArtists.length > 2*userListensTo.length) {
            fetchSongList();
        }
    }, [similarArtists]);

    //once we get the top songs of the artists we can make the call to openai
    //this is so we don't keep making calls to openAI even if songList updates again because otherwise it'll be more than one call and we won't get the correct number of songs (i think)
    const [hasFetchedFromOpenAI, setHasFetchedFromOpenAI] = useState(false);
    const [recs, setRecs] = useState([]);

    const getRecs = async () => {
        const userSpotifyData = {
            topArtists: artistData,
            topSongs: songData,
            recents: recentTracks
        };
        await fetch("", { //NEED TO ADD THE URL FOR OPENAIAPI STUFF
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                spotify_data: userSpotifyData,
                list_of_songs: songList
            }),
        });
    }

    //commented out just to have clean working ish version pushed to github
    // useEffect(() => {
    //     const fetchRecs = async () => {
    //         setHasFetchedFromOpenAI(true);
    //         const result = await getRecs();
    //         setRecs(result);
    //     }
    //     if(songList.length > similarArtists.length*8 && !hasFetchedFromOpenAI) {
    //         fetchRecs();
    //     }
    // }, [songList, hasFetchedFromOpenAI]);


    return (
        <div>
            <Header showConnectButton={false} />
            <h3>This is the full list of recommended songs:</h3>
            {songList.map((d, index) => <p key={index}>{d}</p>)}
        </div>
    );
}

export default Recommend;