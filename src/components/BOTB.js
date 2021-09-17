import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getBOTBByUrlSlug, addTrackToBOTB, addUserToBOTB } from '../api/botb';
import { Button } from 'react-bootstrap';
import AddTrack from './AddTrack';

class BOTB extends React.Component {
    constructor() {
        super();
        this.state = {
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
        this.addTrack =  this.addTrack.bind(this);
        this.addUser =  this.addUser.bind(this);
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

    async addTrack(track) {
        try {
            await addTrackToBOTB(this.props.authDetails.username, this.state.id, track, this.props.authDetails.bandmates_access_token).then((result) => {
                    this.setState({
                        tracksAdded: result.data.tracksAdded,
                        trackVotes: result.data.trackVotes,
                    })
                }
            )
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
                                    <div>
                                        <p>{this.state.tracksAdded[item].songName}</p>
                                        <p>added by {item}</p>
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
