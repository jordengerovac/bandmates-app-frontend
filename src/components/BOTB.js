import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getBOTBByUrlSlug, addTrackToBOTB, addUserToBOTB, voteOnBOTBTrack } from '../api/botb';
import { Button } from 'react-bootstrap';
import AddTrack from './AddTrack';
import { BsFillHeartFill } from 'react-icons/bs';

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
            showModal: false,
            loading: true
        }
        this.getBOTB = this.getBOTB.bind(this);
        this.modalPopup = this.modalPopup.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.addUser = this.addUser.bind(this);
        this.voteOnTrack = this.voteOnTrack.bind(this);
        this.countTrackVotes = this.countTrackVotes.bind(this);
    }

    componentDidMount() {
        const urlSlug = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.getBOTB(urlSlug);
    }

    modalPopup() {
        this.setState({
            showModal: !this.state.showModal
        })
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
            const result = await addUserToBOTB(username, this.state.id, this.props.authDetails.bandmates_access_token)
            return result.data;
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

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ?
                        <div style={{margin: 'auto', width: '60vw'}}>
                            <h2 style={{textAlign: 'center', marginBottom: '25px'}}>{this.state.name}</h2>
                            {Object.keys(this.state.tracksAdded).map((item, i) => {
                                return(
                                    <div style={{display: 'flex', margin: '20px'}}>
                                        <div key={i} style={{display: 'flex', justifyContent: 'space-between', margin: '0px auto 0px auto', textAlign: 'left', backgroundColor: '#1b1d20', width: '70%'}}>
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
                                                    <BsFillHeartFill size={"30px"} color="#df3030" style={{cursor: 'pointer'}} /> :
                                                    <BsFillHeartFill size={"30px"} color="white" style={{cursor: 'pointer'}} onClick={() => this.voteOnTrack(this.state.tracksAdded[item].seedId)} />
                                                }
                                                <p style={{fontSize: 'small'}}>{this.countTrackVotes(this.state.tracksAdded[item].seedId )}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button onClick={this.modalPopup} style={{margin: '25px'}} className="addBOTBButton">Add Tracks</Button>
                                <Button onClick={this.modalPopup} style={{margin: '25px'}} className="addBOTBButton">Add Users</Button>
                            </div>
                            <AddTrack showModal={this.state.showModal} modalPopup={this.modalPopup} addTrack={this.addTrack} addUser={this.addUser} />
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
