// displayed once log in
import React from 'react'
import useAuth from './useAuth'
import {Container, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: "f7e20170b64b41a39cd2700b998b636f"
})
 
// this page is displayed if we have a valid authorization code
export default function Dashboard({code}) { // can do Dashboard(props) but ({code}) makes more readable, props made up of {code, any other params}
    const accessToken = useAuth({code}); // its a function not react component, so dont use <>
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch("")
        setLyrics("")
    }

    useEffect(() => {
        if (!playingTrack) return;

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => { // Dashboard has always fed access token here, and now we officially set the access token using Spotify API  
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    let cancel = false;
    useEffect(() => {
        if (cancel) return;
        if (!search) return setSearchResults([])
        if (!accessToken) return
        
        spotifyApi.searchTracks(search).then(res => {

            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => cancel = true;
    }, [accessToken, search])

    return (
        <Container className="d-flex flex-column py-2" style={{height: "100vh"}}> 
            <Form.Control type='search' placeholder='Search Songs/Artists' 
            value = {search} onChange={e => setSearch(e.target.value)} />

            <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                ))}
                {searchResults.length === 0 && (
                     <div className="text-center" style={{whiteSpace: "pre"}}>
                        {lyrics}
                    </div>
                )}
            </div>

            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
        </Container>
    );
}