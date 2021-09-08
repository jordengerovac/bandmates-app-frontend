import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import axios from 'axios';
import NavigationBar from './NavigationBar';

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
        this.getUserProfile();
    }

    getUserProfile() {
        axios.get('/api/v1/users/' + this.props.authDetails.username + '/profiles', { headers: {"Authorization" : `Bearer ${this.props.authDetails.access_token}`} })
        .then(res => {
            this.setState({
                profile: res.data,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)
        })
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
                    {this.state.profile && !this.state.loading ? <p>{this.state.profile.bio}</p> : null}
                    {this.state.profile && !this.state.loading ? <p>{this.state.profile.user.username}</p> : null}
                    {this.state.profile && !this.state.loading ? <p>{this.state.profile.user.firstname}</p> : null}
                    {this.state.profile && !this.state.loading ? <p>{this.state.profile.user.lastname}</p> : null}
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