import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { Button, Form, FormControl } from 'react-bootstrap';
import { getUserProfile } from '../api/users';
import SpotifyWebApi from 'spotify-web-api-node';

class AddTrack extends React.Component {
    constructor(){
        super();
        this.state = {
            profile: null,
            query: '',
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        this.getUserProfile();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleSubmit(e) {
        if(!this.state.loading) {
            e.preventDefault();
            const spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(this.state.profile.spotifyData.spotifyAccessToken)
            spotifyApi.searchTracks(this.state.query).then((result) => {
                console.log(result)
            })
        }
    }

    async getUserProfile() {
        try {
            const result = await getUserProfile(this.props.authDetails.username, this.props.authDetails.bandmates_access_token)
            this.setState({
                profile: result.data,
                loading: false
            })
            return result.data;
        } catch(error) {
            console.error();
        }
    }

    render() {
        return(
            <div>
                <Form className="d-flex" style={{margin: '0 0 0 20px'}}>
                    <FormControl
                        type="search"
                        placeholder="Search for a track"
                        className="mr-2 bandmatesSearchBar"
                        aria-label="Search"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    <Button ref={input => this.inputElement = input} className="bandmatesSearchButton" onClick={this.handleSubmit}>Search Track</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(AddTrack);