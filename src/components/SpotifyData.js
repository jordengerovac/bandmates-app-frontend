import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { fetchSpotifyData } from '../api/spotifydata';
import BeatLoader from "react-spinners/BeatLoader";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize?response_type=code&client_id=95c5f746df16436882efa3d4ebf3b9fa&redirect_uri=http://localhost:3000/connect-spotify&scope=streaming%20user-read-recently-played%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-top-read"

class SpotifyData extends React.Component {
    constructor() {
        super();
        this.state = {
            spotifyData: '',
            trackUri: '',
            loading: true
        }
        this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
        this.setPlayingTrack = this.setPlayingTrack.bind(this);
    }

    componentDidMount() {
        this.fetchSpotifyData();
    }

    setPlayingTrack(uri) {
        this.setState({
            trackUri: uri
        })
    }

    async fetchSpotifyData() {
        try {
            const result = await fetchSpotifyData(this.props.authDetails.username, this.props.authDetails.bandmates_access_token);
            this.setState({
                spotifyData: result.data
            })
        } catch(error) {
            console.log(error)
        }
        this.setState({
            loading: false
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }
        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ? 
                        this.state.spotifyData === "" ? 
                        <div>
                            <h2 style={{marginBottom: '50px'}}>Connect a Spotify account</h2>
                            <a href={SPOTIFY_AUTH_URL}><button className="bandmatesButton">Connect</button></a>
                        </div> : 
                        <div>
                            <h2 style={{marginBottom: '25px'}}>Reconnect your Spotify account or connect a new one</h2> 
                            <p style={{marginBottom: '25px'}}>Go to spotify.com/account and remove Bandmates access, then click connect</p>
                            <a href={SPOTIFY_AUTH_URL}><button className="bandmatesButton">Connect</button></a>
                        </div> : <BeatLoader color='#01961a' />
                    }
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

export default connect(mapStateToProps)(SpotifyData);
