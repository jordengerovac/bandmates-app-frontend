import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { initializeSpotify } from '../api/spotifydata';
import BeatLoader from "react-spinners/BeatLoader";

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

    async initializeSpotify(code) {
        try {
            const result = await initializeSpotify(this.props.authDetails.username, code, this.props.authDetails.bandmates_access_token)
            this.setState({
                spotifyData: result.data,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        if(!this.state.loading && Object.keys(this.state.spotifyData).length !== 0) {
            return <Redirect to={"/profile/" + this.state.spotifyData.profile.id} />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar />
                <div className="App">
                    <p>Connecting your Spotify account...</p>
                    <BeatLoader color='#01961a' />
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
