import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getProfileById } from '../api/profiles';
import logo from '../images/bandmates_logo.png'

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: {},
            loading: true
        }
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        const profileId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.getUserProfile(profileId);
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
                    <h2 style={{marginTop: '30px'}}>Profile</h2>
                    {!this.state.loading ? 
                        Object.keys(this.state.profile).length >= 0 ? 
                        <div>
                            {this.state.profile.image !== null ? <img className="profilePicture" alt="profile" src={`data:image/jpeg;base64,${this.state.profile.image}`} /> : <img className="profilePicture" alt="profile" src={logo} /> }
                            <p>{this.state.profile.user.firstname} {this.state.profile.user.lastname}</p>
                            <p>{this.state.profile.user.username}</p>
                            <p>{this.state.profile.bio}</p>
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