import '../App.css';
import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


export default function MusicPlayer(props) {
    if(!props.token){
        return null;
    }
    return (
        <SpotifyPlayer 
            play={props.trackUri ? true : false} 
            token={props.token} 
            showSaveIcon 
            uris={props.trackUri ? [props.trackUri] : []} 
            styles={{
                activeColor: '#008216',
                bgColor: '#1b1d20',
                color: 'white',
                loaderColor: 'white',
                sliderColor: '#008216',
                trackArtistColor: 'white',
                trackNameColor: 'white',
            }} 
        />
    )
}
