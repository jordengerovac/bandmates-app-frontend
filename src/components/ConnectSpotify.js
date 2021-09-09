import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize?response_type=code&client_id=95c5f746df16436882efa3d4ebf3b9fa&redirect_uri=http://localhost:3000/home&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

class ConnectSpotify extends React.Component {
    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar />
                <div className="App">
                    <h2 style={{marginBottom: '50px'}}>Connect a Spotify account</h2>
                    <a href={SPOTIFY_AUTH_URL}><button className="bandmatesButton">Connect</button></a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(ConnectSpotify);
