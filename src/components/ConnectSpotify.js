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
        this.state = {
            spotifyData: {},
            loading: true
        }
        this.initializeSpotify = this.initializeSpotify.bind(this);
    }

    componentDidMount() {
        const code = window.location.search.substring(window.location.search.indexOf("=") + 1);
        this.initializeSpotify(code);
    }

    initializeSpotify(code) {
        const config = {
            headers: { Authorization: `Bearer ${this.props.authDetails.bandmates_access_token}` }
        };

        axios.post('/api/v1/spotifydata/initialize/' + this.props.authDetails.username + '?code=' + code, {}, config)
        .then(res => {
            this.setState({
                spotifyData: res.data,
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        if(!this.state.loading && Object.keys(this.state.spotifyData).length !== 0) {
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

export default connect(mapStateToProps)(ConnectSpotify);
