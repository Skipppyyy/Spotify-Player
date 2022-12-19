import React from 'react';
import {useState} from 'react';

export default function TrackSearchResult({track, chooseTrack}) {
    const [playing, setPlaying] = useState(false);

    function handlePlay() {
        setPlaying(true);
        chooseTrack(track);
    }

    return(
        <div className="d-flex m-2 align-items-center " style={{cursor: "pointer", gap: "1rem"}} onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
            <div className='ml-4' style={playing ? {color: "#1db954"} : {}}>
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}