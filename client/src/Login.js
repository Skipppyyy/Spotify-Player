import React from 'react';
import {Container} from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f7e20170b64b41a39cd2700b998b636f&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

//const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f7e20170b64b41a39cd2700b998b636f&response_type=code&redirect_uri=http://localhost:3000&scope=streaming";

export default function Login() {
    console.log("Login")
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}> 
            <a className="btn btn-outline-success btn-lg" href={AUTH_URL}>
                Log In with Spotify
            </a>
        </Container>
    );
}