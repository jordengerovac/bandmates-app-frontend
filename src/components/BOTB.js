import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getBOTBByUrlSlug, addTrackToBOTB, addUserToBOTB, voteOnBOTBTrack, removeVoteFromBOTBTrack, updateBOTB, deleteBOTB } from '../api/botb';
import { getUserProfile } from '../api/users';
import AddTrack from './AddTrack';
import { BsFillHeartFill } from 'react-icons/bs';
import MusicPlayer from './MusicPlayer';
import AddUser from './AddUser';

class BOTB extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            startDate: '',
            endDate: '',
            tracksAdded: {},
            trackVotes: {},
            trackUri: '',
            showTrackModal: false,
            showUserModal: false,
            loading: true,
            profile: null,
            loadingProfile: true,
            deleted: false
        }
        this.getBOTB = this.getBOTB.bind(this);
        this.trackModalPopup = this.trackModalPopup.bind(this);
        this.userModalPopup = this.userModalPopup.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.addUser = this.addUser.bind(this);
        this.voteOnTrack = this.voteOnTrack.bind(this);
        this.removeVoteFromTrack = this.removeVoteFromTrack.bind(this);
        this.countTrackVotes = this.countTrackVotes.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getWinner = this.getWinner.bind(this);
        this.updateBOTB = this.updateBOTB.bind(this);
        this.deleteBOTB = this.deleteBOTB.bind(this);
    }

    componentDidMount() {
        const urlSlug = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.getBOTB(urlSlug);
        this.getProfile();
    }

    setPlayingTrack(uri) {
        this.setState({
            trackUri: uri
        })
    }

    trackModalPopup() {
        this.setState({
            showTrackModal: !this.state.showTrackModal
        })
    }

    userModalPopup() {
        this.setState({
            showUserModal: !this.state.showUserModal
        })
    }

    async getProfile() {
        try {
            const result = await getUserProfile(this.props.authDetails.username, this.props.authDetails.bandmates_access_token);
            this.setState({
                profile: result.data,
                loadingProfile: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    async voteOnTrack(seedId) {
        try {
            await voteOnBOTBTrack(this.props.authDetails.username, seedId, this.state.id, this.props.authDetails.bandmates_access_token).then((result) => {
                this.setState({
                    trackVotes: result.data.trackVotes
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    async removeVoteFromTrack(seedId) {
        try {
            await removeVoteFromBOTBTrack(this.props.authDetails.username, seedId, this.state.id, this.props.authDetails.bandmates_access_token).then((result) => {
                this.setState({
                    trackVotes: result.data.trackVotes
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    async addTrack(track) {
        try {
            await addTrackToBOTB(this.props.authDetails.username, this.state.id, track, this.props.authDetails.bandmates_access_token).then((result) => {
                this.setState({
                    tracksAdded: result.data.tracksAdded,
                    trackVotes: result.data.trackVotes
                })
            })
        } catch(error) {
            console.error();
        }
    }

    async addUser(username) {
        try {
            await addUserToBOTB(username, this.state.id, this.props.authDetails.bandmates_access_token)
        } catch(error) {
            console.error();
        }
    }

    async getBOTB(urlSlug) {
        try {
            const result = await getBOTBByUrlSlug(urlSlug, this.props.authDetails.bandmates_access_token);
            this.setState({
                name: result.data.name,
                id: result.data.id,
                startDate: result.data.startDate,
                endDate: result.data.endDate,
                tracksAdded: result.data.tracksAdded,
                trackVotes: result.data.trackVotes,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    countTrackVotes(seedId) {
        var count = 0;
        for (var vote in this.state.trackVotes) {
            if (this.state.trackVotes[vote] === seedId) {
                count = count + 1;
            }
        }
        return count;
    }

    getWinner() {
        var voteCount = {}
        const votesArray = Object.values(this.state.trackVotes)
        for (var i in votesArray) {
            if (voteCount[votesArray[i]]) {
                voteCount[votesArray[i]] = voteCount[votesArray[i]] + 1;
            }
            else {
                voteCount[votesArray[i]] = 1
            }
        }
        if (Object.keys(voteCount).length < 1) {
            return null;
        }
        const winningTrackSeedId = Object.keys(voteCount).reduce((a, b) => voteCount[a] > voteCount[b] ? a : b);

        const tracksArray = Object.values(this.state.tracksAdded)
        for (var j in tracksArray) {
            if (tracksArray[j].seedId === winningTrackSeedId)
                return tracksArray[j]
        }
        return null;
    }

    async updateBOTB() {
        try{
            var startDate = new Date();
            var endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            const botb = {
                startDate: startDate,
                endDate: endDate,
                tracksAdded: {},
                trackVotes: {}
            }
            await updateBOTB(this.state.id, botb, this.props.authDetails.bandmates_access_token).then(result => {
                this.setState({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    tracksAdded: {},
                    trackVotes: {}
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    async deleteBOTB() {
        try{
            await deleteBOTB(this.state.id, this.props.authDetails.bandmates_access_token)
            this.setState({
                deleted: true
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        if (this.state.deleted) {
            return <Redirect to="/botb-dashboard" />
        }

        if (!this.state.loading) {
            if (new Date(new Date(this.state.endDate).toDateString()) < new Date(new Date().toDateString())) {
                const winningTrack = this.getWinner();
                return(
                    <div className="App">
                        {winningTrack !== null ?
                            <div>
                                <h4>This contest is over, {winningTrack.songName} by {winningTrack.artist} was the winner!</h4>
                                <img alt="album-art" src={winningTrack.artwork} />
                            </div> : null
                        }
                        <button onClick={this.updateBOTB} style={{margin: '25px'}} className="bandmatesButton">Start Again</button>
                        <button onClick={this.deleteBOTB} style={{margin: '25px'}} className="bandmatesButton">End Contest</button>
                    </div>
                )
            }
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading && !this.state.loadingProfile ?
                        <div style={{margin: 'auto'}}>
                            <h2 style={{textAlign: 'center'}}>{this.state.name}</h2>
                            <p style={{marginBottom: '25px', fontSize: 'small', color: 'gray'}}>Contest ends on {new Date(this.state.endDate).toISOString().slice(0, 10)}</p>
                            {Object.keys(this.state.tracksAdded).map((item, i) => {
                                return(
                                    <div style={{display: 'flex', margin: '20px auto 20px auto', width: '70vw'}}>
                                        <div key={i} style={{display: 'flex', justifyContent: 'space-between', margin: '0px auto 0px auto', textAlign: 'left', backgroundColor: '#1b1d20', width: '70%', cursor: 'pointer'}} onClick={() => this.setPlayingTrack(this.state.tracksAdded[item].uri)}>
                                            <div>
                                                <img alt="album-art" src={this.state.tracksAdded[item].artwork} style={{marginRight: '15px', width: 'auto', maxHeight: '150px'}}/>
                                            </div>
                                            <div style={{padding: '25px 40px 0px 0px'}}>
                                                <p style={{cursor: 'pointer', margin: '12px 0px 0px 0px', fontSize: 'large', textAlign: 'right'}}>{this.state.tracksAdded[item].songName} by {this.state.tracksAdded[item].artist}</p>
                                                <p style={{fontSize: 'small', color: 'gray', textAlign: 'right', padding: '0px'}}>added by {item}</p>
                                            </div>
                                        </div>
                                        <div style={{position: 'relative', top: '50px', right: '75px'}}>
                                            <div>
                                                {this.state.trackVotes[this.props.authDetails.username] === this.state.tracksAdded[item].seedId ? 
                                                    <BsFillHeartFill size={"30px"} color="#df3030" style={{cursor: 'pointer'}} onClick={() => this.removeVoteFromTrack(this.state.tracksAdded[item].seedId)} /> :
                                                    <BsFillHeartFill size={"30px"} color="white" style={{cursor: 'pointer'}} onClick={() => this.voteOnTrack(this.state.tracksAdded[item].seedId)} />
                                                }
                                                <p style={{fontSize: 'small'}}>{this.countTrackVotes(this.state.tracksAdded[item].seedId )}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button onClick={this.trackModalPopup} style={{margin: '25px'}} className="addBOTBButton">Add Track</button>
                                <button onClick={this.userModalPopup} style={{margin: '25px'}} className="addBOTBButton">Add User</button>
                            </div>
                            <AddTrack showModal={this.state.showTrackModal} modalPopup={this.trackModalPopup} addTrack={this.addTrack} profile={this.state.profile} />
                            <AddUser showModal={this.state.showUserModal} modalPopup={this.userModalPopup} addUser={this.addUser} profile={this.state.profile} botbId={this.state.id} />
                            <div>
                                {this.state.profile.spotifyData !== null ?
                                    <div>
                                        <div style={{marginBottom: '90px'}}></div>
                                        <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
                                            <MusicPlayer token={this.state.profile.spotifyData.spotifyAccessToken} trackUri={this.state.trackUri} />
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
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

export default connect(mapStateToProps)(BOTB);
