import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { fetchSpotifyData } from '../api/spotifydata';

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize?response_type=code&client_id=95c5f746df16436882efa3d4ebf3b9fa&redirect_uri=http://localhost:3000/connect-spotify&scope=streaming%20user-read-recently-played%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

class SpotifyData extends React.Component {
    constructor() {
        super();
        this.state = {
            spotifyData: '',
            loading: true
        }
        this.fetchSpotifyData = this.fetchSpotifyData.bind(this);
    }

    componentDidMount() {
        this.fetchSpotifyData();
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
                {!this.state.loading ? 
                    this.state.spotifyData === "" ? 
                    <div className="App">
                        <h2 style={{marginBottom: '50px'}}>Connect a Spotify account</h2>
                        <a href={SPOTIFY_AUTH_URL}><button className="bandmatesButton">Connect</button></a>
                    </div> : 
                     <div className="App">
                         <h2>Your Spotify Data</h2>
                         <p>Top Genre: {this.state.spotifyData.topGenre}</p>
                    </div> : null
                }
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
