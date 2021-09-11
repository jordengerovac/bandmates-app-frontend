import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';


export default function MusicPlayer(props) {
    if(!props.token){
        return null;
    }
    return (<SpotifyPlayer play={true} token={props.token} showSaveIcon uris={props.trackUri ? [props.trackUri] : []} />)
}
