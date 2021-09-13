import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getProfileById } from '../api/profiles';
import logo from '../images/bandmates_logo.png'
import MusicPlayer from './MusicPlayer';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: {},
            trackUri: '',
            loading: true
        }
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        const profileId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.getUserProfile(profileId);
    }

    setPlayingTrack(uri) {
        this.setState({
            trackUri: uri
        })
    }

    async getUserProfile(profileId) {
        try {
            const result = await getProfileById(profileId, this.props.authDetails.bandmates_access_token)
            this.setState({
                profile: result.data,
                loading: false
            })
        } catch(error) {
            console.error();
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        if (!this.state.loading && Object.keys(this.state.profile).length === 0) {
            return <Redirect to="/edit-profile" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ? 
                        Object.keys(this.state.profile).length >= 0 ?
                        <div> 
                            <div className="profileCard">
                                {this.state.profile.image !== null ? <img className="profilePicture" alt="profile" src={`data:image/jpeg;base64,${this.state.profile.image}`} /> : <img className="profilePicture" alt="profile" src={logo} /> }
                                <h2 style={{margin: '12px 0px 0px 0px'}}>{this.state.profile.user.firstname} {this.state.profile.user.lastname}</h2>
                                <h6 style={{color: '#898989'}}>{this.state.profile.user.username}</h6>
                                <p style={{margin: '22px auto 0px auto', width: '32vw'}}>{this.state.profile.bio}</p>
                            </div>
                            {this.state.profile.spotifyData !== null ?
                                <div style={{display: 'flex'}}>
                                    <div className="recentlyPlayedCard">
                                        <h2 style={{margin: '12px 0 70px 50px', textAlign: 'left'}}>Recently Played</h2>
                                        {this.state.profile.spotifyData.recentTracks.slice(0, 13).map((track, i) => {
                                            return(
                                                <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                    <img alt="album-art" onClick={() => this.setPlayingTrack(track.uri)} src={track.artwork} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                    <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(track.uri)}>{i+1}.  Artist: {track.artist}, Song Name: {track.songName}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <div className="topTracksCard">
                                            <h2 style={{margin: '12px 0 70px 50px', textAlign: 'left'}}>Top Tracks</h2>
                                            {this.state.profile.spotifyData.topTracks.slice(0, 5).map((track, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(track.uri)} src={track.artwork} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(track.uri)}>{i+1}.  Artist: {track.artist}, Song Name: {track.songName}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="topTracksCard">
                                            <h2 style={{margin: '12px 0 70px 50px', textAlign: 'left'}}>Top Artists</h2>
                                            {this.state.profile.spotifyData.topArtists.slice(0, 5).map((artist, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(artist.uri)} src={artist.imageUrl} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(artist.uri)}>{i+1}.  Artist: {artist.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div> : 
                                <div>
                                    <h3 style={{margin: '12px 0px 25px 0px'}}>{this.state.profile.user.username !== this.props.authDetails.username ? `${this.state.profile.user.firstname} doesn't` : `You don't`} have any Spotify data to display</h3>
                                    <p>{this.state.profile.user.username !== this.props.authDetails.username ? `Their` : `Your`} data will show up here once {this.state.profile.user.username !== this.props.authDetails.username ? `they` : `you`} connect {this.state.profile.user.username !== this.props.authDetails.username ? `their` : `your`} Bandmates account to Spotify.</p>
                                </div>
                            }
                            {this.state.profile.spotifyData !== null ?
                                <div>
                                    <div style={{marginBottom: '90px'}}></div>
                                    <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
                                        <MusicPlayer token={this.state.profile.spotifyData.spotifyAccessToken} trackUri={this.state.trackUri} />
                                    </div>
                                </div> : null
                            }
                        </div> : null
                        : null
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

export default connect(mapStateToProps)(Profile);