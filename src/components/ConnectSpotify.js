import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import axios from 'axios';
import { fetchSpotifyTokens } from '../actions/authActions'

class ConnectSpotify extends React.Component {
    constructor() {
        super();
        this.getSpotifyTokens = this.getSpotifyTokens.bind(this);
    }

    componentDidMount() {
        const code = window.location.search.substring(window.location.search.indexOf("=") + 1);
        this.getSpotifyTokens(code);
    }

    getSpotifyTokens(code) {
        const config = {
            headers: { Authorization: `Bearer ${this.props.authDetails.bandmates_access_token}` }
        };

        axios.post('/api/v1/spotifydata/tokens?code=' + code, {}, config)
        .then(res => {
            this.props.fetchSpotifyTokens(res.data)

        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        if(this.props.authDetails.spotify_access_token) {
            return <Redirect to="/spotify-data" />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar />
                <div className="App">
                    <h4 style={{marginBottom: '50px'}}>Connecting your Spotify account...</h4>
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

export default connect(mapStateToProps, { fetchSpotifyTokens })(ConnectSpotify);
