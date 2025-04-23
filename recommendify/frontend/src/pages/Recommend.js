import React, {useState, useEffect, useMemo, useRef} from "react";
import Header from '../components/header';

const Recommend = () => {
    // //get top artist data
    // const [artistData, setArtistData] = useState([]);
    // //get top song data
    // const [songData, setSongData] = useState([]);
    // //get recent track data
    // const [recentTracks, setRecentTracks] = useState([]);

    // //populate spotify data once when page is rendered
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const artistResponse = await fetch('spotify/top-artists');
    //         const artistResult = await artistResponse.json();
    //         //console.log("result:")
    //         setArtistData(artistResult);
    //         //console.log(artistResult);

    //         const songResponse = await fetch('spotify/top-tracks');
    //         const songResult = await songResponse.json();
    //         setSongData(songResult);

    //         const recentResponse = await fetch('spotify/recently-played');
    //         const recentResult = await recentResponse.json();
    //         setRecentTracks(recentResult);
    //     };
    //     fetchData();
    // }, []);

    // const isDataReady = artistData.length === 20 && songData.length === 20 && recentTracks.length === 20;
    // //using the data we get from spotify api to compile an array of the artists the user already listens to
    // //helper function to find artists the user listens to
    // const getListensTo = () => {
    //     const listensToSet = new Set();
    //     artistData.map(d => listensToSet.add(d.name));
    //     for(let i = 0; i < songData.length; i++) {
    //         (songData[i].artist).map(d => listensToSet.add(d));
    //     }
    //     for(let i = 0; i < recentTracks.length; i++) {
    //         (recentTracks[i].artist).map(d => listensToSet.add(d));
    //     }
    //     // console.log(listensToSet);
    //     return Array.from(listensToSet);
    // }

    // //when we get the data from spotify, populate userListensTo with the names of the artists the user listens to
    // const userListensTo = useMemo(
    //     () => {
    //         if(isDataReady) {
    //             return getListensTo();
    //         }
    //         else {
    //             return [];
    //         }
            
    //     },
    //     [artistData, recentTracks, songData]
    // );

    // //for each artist in userListensTo, find the similar artists 
    // //helper function to get similar artists
    // async function getSimilar () {
    //     const similarSet = new Set();
    //     const userListensToSet = new Set(userListensTo);
    //     // console.log("userListens:")
    //     // console.log(userListens);
    //     for(let i = 0; i < userListensTo.length; i++) {
    //         const url = 'lastfm/similar-artists?q=' + encodeURIComponent(userListensTo[i]);
    //         let response = await fetch(url);
    //         let result = await response.json();
    //         if(result.error) {
    //             continue;
    //         }
    //         result.similar_artists.forEach(d => {
    //             if(!userListensToSet.has(d.artist)) { //because we don't want to add artists that a user already listens to
    //                 similarSet.add(d.artist);
    //             }
    //         });
    //     }
    //     // console.log("getting similar now:");
    //     // console.log(similarSet);
    //     return Array.from(similarSet);
    // }

    // const [similarArtists, setSimilarArtists] = useState([]);

    // //once userListensTo changes/updates then also update similarArtists:
    // useEffect(() => {
    //     const fetchSimilar = async () => {
    //         const result = await getSimilar();
    //         setSimilarArtists(result);
    //     };
    
    //     if (isDataReady && userListensTo.length > 0) {
    //         fetchSimilar();
    //     }
    // }, [userListensTo]);

    // //list of songs that's going to get passed to open ai api
    // const [songList, setSongList] = useState([]);

    // //helper function to populate songList
    // const getSongList = async() => {
    //     //console.log("getting song list");
    //     const songSet = new Set();
    //     for(let i = 0; i < similarArtists.length; i++) {
    //         const url = "spotify/artist-top-tracks?q=" + encodeURIComponent(similarArtists[i]);
    //         //console.log(url);
    //         let response = await fetch(url);
    //         let result = await response.json();
    //         if(result.error) {
    //             continue;
    //         }
    //         result.forEach((r) => {
    //             let songInfo = r.name + " by ";
    //             for(let j = 0; j < r.artist.length; j++) {
    //                 if(j > 0) {
    //                     songInfo += ", ";
    //                 }
    //                 songInfo += r.artist[j];
    //             }
    //             //console.log(songInfo);
    //             songSet.add(songInfo);
    //         });
    //     }
    //     console.log(songSet);
    //     return Array.from(songSet);
    // };

    // //when we have our list of similar artists, then we can get the songs of those artists to pass to openai
    // useEffect(() => {
    //     const fetchSongList = async () => {
    //         const result = await getSongList();
    //         setSongList(result);
    //     };

    //     if (similarArtists.length > 0.5*userListensTo.length) {
    //         fetchSongList();
    //     }
    // }, [similarArtists]);

    // //once we get the top songs of the artists we can make the call to openai
    // //this is so we don't keep making calls to openAI even if songList updates again because otherwise it'll be more than one call and we won't get the correct number of songs (i think)
    // const [hasFetchedFromOpenAI, setHasFetchedFromOpenAI] = useState(false);
    // const [recs, setRecs] = useState([]);

    // const getRecs = async () => {
    //     let artistDataCleaned = []; //an array of the top artists names
    //     artistData.forEach(element => {
    //         artistDataCleaned.push(element.name);
    //     });
    //     let songDataCleaned = []; //an array of top songs in the form song name by artist1, artist2, ..
    //     songData.forEach(element => {
    //         let songInfo = element.name + " by ";
    //         for(let j = 0; j < element.artist.length; j++) {
    //             if(j > 0) {
    //                 songInfo += ", ";
    //             }
    //             songInfo += element.artist[j];
    //         }
    //         songDataCleaned.push(songInfo);
    //     });
    //     let recentTracksCleaned = []; //array of recent tracks in the form song name by artist1, artist2, ..
    //     recentTracks.forEach(element => {
    //         let songInfo = element.name + " by ";
    //         for(let j = 0; j < element.artist.length; j++) {
    //             if(j > 0) {
    //                 songInfo += ", ";
    //             }
    //             songInfo += element.artist[j];
    //         }
    //         recentTracksCleaned.push(songInfo);
    //     });
    //     const userSpotifyData = {
    //         topArtists: artistDataCleaned,
    //         topSongs: songDataCleaned,
    //         recents: recentTracksCleaned
    //     };
    //     let response = await fetch("openai/get-recs", { 
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             spotify_data: userSpotifyData,
    //             list_of_songs: songList
    //         }),
    //     });
    //     let result = await response.json();
    //     return result.recommendations;
    //     //console.log(result);
    // }

    // useEffect(() => {
    //     const fetchRecs = async () => {
    //         setHasFetchedFromOpenAI(true);
    //         const result = await getRecs();
    //         setRecs(result);
    //     }
    //     if(songList.length > similarArtists.length*9 && !hasFetchedFromOpenAI) {
    //         fetchRecs();
    //     }
    // }, [songList, hasFetchedFromOpenAI]);

    const [recs, setRecs] = useState("");
    const hasFetchedFromOpenAI = useRef(false);
    useEffect(() => {
        if (hasFetchedFromOpenAI.current) return;
        hasFetchedFromOpenAI.current = true;
        const fetchRecs = async() => {
            let response = await fetch("rec/get-recs");
            let result = await response.json();
            if(result.error){
                setRecs("<p>there was an error getting your music rec from OpenAI :(</p>")
            }
            else {
                setRecs(result.recommendations);
            }
        }
        fetchRecs();
    }, []);


    return (
        <div>
            <Header showConnectButton={false} />
            <h3>&nbsp;Here are the songs openAI recommends:</h3>
            <div dangerouslySetInnerHTML={{ __html: recs }} />
        </div>
    );
}

export default Recommend;