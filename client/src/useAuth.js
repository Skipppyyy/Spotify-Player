// this file manages all access token stuff (for some future use)
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function useAuth({code}) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => { // arrow function
        axios.post('http://localhost:3001/login', {code}).then(res => { // posts the code to login route and then waits for promise to return response 
            // res.data is an axios default field
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            setExpiresIn(res.data.expires_in);
            window.history.pushState({}, null, "/"); // clears code from url
        }).catch(() => { // do callback function so I can say to execute something if error
            window.location = '/'; // if problem with auth, just send back and make them re sign in 
        }); 
    }, [code]); // list of variables after is optional, runs only when these values change (code)


    // use expiresIn to automatically refresh 
    useEffect(() => { // was running once at start when variables first made & they were undefined
        if (!refreshToken || !expiresIn) return;
        const timeout = setInterval(() => {
            axios.post('http://localhost:3001/refresh', {refreshToken}).then(res => { 
                setAccessToken(res.data.access_token);
                setExpiresIn(res.data.expires_in); 
            }).catch(() => { 
                window.location = '/'; 
        }); 
        }, (expiresIn - 60) * 1000) // time to wait for, refreshes 1 minute before expire
        
        return() => clearInterval(timeout); // way to run function on return, clears previously set timeout
    }, [refreshToken, expiresIn])

    return accessToken; 
} 