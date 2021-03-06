import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getProfileById } from '../api/profiles';
import { fetchSpotifyData } from '../api/spotifydata';
import MusicPlayer from './MusicPlayer';
import BeatLoader from "react-spinners/BeatLoader";
import { GiDrum, GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { ImHeadphones } from 'react-icons/im';
import { IoIosMicrophone } from 'react-icons/io';
import ProfileIcon from './ProfileIcon';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: {},
            urlProfileId: '',
            spotifyData: null,
            trackUri: '',
            loadingProfile: true,
            loadingSpotifyData: true
        }
        this.getUserProfile = this.getUserProfile.bind(this);
        this.getSpotifyData = this.getSpotifyData.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }

    componentDidMount() {
        const profileId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.setState({
            urlProfileId: profileId
        })
        this.getUserProfile(profileId).then((profile) => {
            this.getSpotifyData(profile.user.username);
        });
    }

    componentDidUpdate(prevProps) {
        const profileId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        if (this.state.urlProfileId !== profileId) {
            this.setState({
                urlProfileId: profileId,
                loadingSpotifyData: true
            })
            this.getUserProfile(profileId).then((profile) => {
                this.getSpotifyData(profile.user.username);
            });
        }
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
                loadingProfile: false
            })
            return result.data;
        } catch(error) {
            console.error();
        }
    }

    async getSpotifyData(username) {
        try {
            const result = await fetchSpotifyData(username, this.props.authDetails.bandmates_access_token);
            this.setState({
                spotifyData: result.data
            })
        } catch(error) {
            console.log(error)
        }
        this.setState({
            loadingSpotifyData: false
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        if (!this.state.loadingProfile && Object.keys(this.state.profile).length === 0) {
            return <Redirect to="/update-profile" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loadingProfile && !this.state.loadingSpotifyData ? 
                        Object.keys(this.state.profile).length >= 0 ?
                        <div> 
                            <div className="profileCard">
                                <ProfileIcon iconName={this.state.profile.iconName} iconColour={this.state.profile.iconColour} size="150px" />
                                <h2 style={{margin: '12px 0px 0px 0px'}}>{this.state.profile.user.firstname} {this.state.profile.user.lastname}</h2>
                                <h6 style={{color: '#898989'}}>
                                    {this.state.profile.user.username}&nbsp;
                                    {this.state.profile.instrument === 'drums' ? <GiDrum /> : null}
                                    {this.state.profile.instrument === 'bass' ? <GiGuitarBassHead /> : null}
                                    {this.state.profile.instrument === 'guitar' ? <GiGuitarHead /> : null}
                                    {this.state.profile.instrument === 'vocals' ? <IoIosMicrophone /> : null}
                                    {this.state.profile.instrument === 'listener' ? <ImHeadphones /> : null}
                                </h6>
                                <p style={{margin: '22px auto 0px auto', width: '32vw'}}>{this.state.profile.bio}</p>
                            </div>
                            {this.state.spotifyData !== null ?
                                <div className="spotifyProfile">
                                    <div className="leftProfile">

                                        <div className="topTracksCard">
                                            <h2 style={{margin: '12px 0 50px 50px', textAlign: 'left'}}>Top Tracks</h2>
                                            {this.state.spotifyData.topTracks.slice(0, 5).map((track, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(track.uri)} src={track.artwork} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(track.uri)}>{i+1}. {track.songName} by {track.artist}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="topTracksCard">
                                            <h2 style={{margin: '12px 0 50px 50px', textAlign: 'left'}}>Top Artists</h2>
                                            {this.state.spotifyData.topArtists.slice(0, 5).map((artist, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(artist.uri)} src={artist.imageUrl} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(artist.uri)}>{i+1}. {artist.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="topTracksCard">
                                            <h2 style={{margin: '12px 0 40px 50px', textAlign: 'left'}}>Top Genres</h2>
                                            {this.state.spotifyData.topGenres.slice(0, 3).map((genre, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '5px 50px', textAlign: 'left'}}>
                                                        <p>{i+1}. {this.capitalizeFirstLetter(genre)}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="rightProfile">
                                        <div className="recentlyPlayedCard">
                                            <h2 style={{margin: '12px 0 50px 50px', textAlign: 'left'}}>Recently Played</h2>
                                            {this.state.spotifyData.recentTracks.slice(0, 17).map((track, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(track.uri)} src={track.artwork} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(track.uri)}>{i+1}. {track.songName} by {track.artist}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="recentlyPlayedCard">
                                            <h2 style={{margin: '12px 0 50px 50px', textAlign: 'left'}}>Recommendations</h2>
                                            {this.state.spotifyData.recommendedTracks.map((track, i) => {
                                                return(
                                                    <div key={i} style={{display: 'flex', justifyContent: 'left', margin: '30px 50px', textAlign: 'left'}}>
                                                        <img alt="album-art" onClick={() => this.setPlayingTrack(track.uri)} src={track.artwork} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                                        <p style={{cursor: 'pointer'}} onClick={() => this.setPlayingTrack(track.uri)}>{i+1}. {track.songName} by {track.artist}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div> : 
                                <div className="profileCard">
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
                        : <BeatLoader color='#01961a' />
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