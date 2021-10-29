import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import { AiOutlinePlus } from 'react-icons/ai';

class AddTrack extends React.Component {
    constructor(){
        super();
        this.state = {
            profile: null,
            query: '',
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterClicked = this.handleEnterClicked.bind(this);
        this.handleAddTrack = this.handleAddTrack.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleEnterClicked(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.inputElement.click();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.loading) {
            const spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(this.props.profile.spotifyData.spotifyAccessToken)
            spotifyApi.searchTracks(this.state.query).then((result) => {
                this.setState({
                    searchResults: result.body.tracks.items
                })
            })
        }
    }

    handleAddTrack(artist, songName, uri, artwork, seedId) {
        const track = {
            artist: artist,
            songName: songName,
            uri: uri,
            artwork: artwork,
            seedId: seedId
        }
        this.props.addTrack(track);
        this.props.modalPopup();
    }

    render() {
        if (!this.state.loading && !this.props.profile.spotifyData) {
            return(
                <div>
                    <Modal
                    show={this.props.showModal}
                    onHide={this.props.modalPopup}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Connect Spotify
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>You must connect Spotify before you can add tracks</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.modalPopup} className="bandmatesCloseButton">Close</Button>
                    </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        else {
            return(
                <div>
                    <Modal
                    show={this.props.showModal}
                    onHide={this.props.modalPopup}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Search for a track to add
                        </Modal.Title>
                        <Form className="form-flex" style={{margin: '0 0 0 20px'}}>
                            <FormControl
                                type="search"
                                placeholder="Search for a track"
                                className="mr-2 bandmatesSearchBar"
                                aria-label="Search"
                                name="query"
                                value={this.state.query}
                                onChange={this.handleChange}
                                onKeyDown={this.handleEnterClicked}
                            />
                            <Button ref={input => this.inputElement = input} className="bandmatesSearchButton" onClick={this.handleSubmit}>Search Track</Button>
                        </Form>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.searchResults.map((track, i) => {
                            return(
                                <div className="addTrack" key={i}>
                                    <img alt="album-art" src={track.album.images[2].url} style={{width: '50px', height: '50px', cursor: 'pointer', marginRight: '15px'}}/>
                                    <p style={{cursor: 'pointer', marginTop: '12px'}}>{track.name} by {track.artists[0].name}</p>
                                    <button className="addTrackButton" onClick={() => this.handleAddTrack(track.artists[0].name, track.name, track.uri,track.album.images[1].url, track.id)}><AiOutlinePlus /></button>
                                </div>
                            )
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.props.modalPopup} className="bandmatesCloseButton">Close</button>
                    </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(AddTrack);