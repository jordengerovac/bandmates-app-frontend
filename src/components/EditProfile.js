import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import axios from 'axios';
import NavigationBar from './NavigationBar';

class CreateProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            bio: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const config = {
            headers: { Authorization: `Bearer ${this.props.authDetails.access_token}` }
        };
        
        const body = {
           bio: this.state.bio
        };

        axios.post('/api/v1/profiles/users/' + this.props.authDetails.username, body, config)
        .then(res => {
            this.setState({
                bio: ''
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    <h2 style={{marginTop: '30px'}}>Edit Profile</h2>
                    <div>
                        <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                            <textarea placeholder="bio" value={this.state.bio} onChange={this.handleChange} name="bio"></textarea>
                            <input type="submit" value="Submit" className="bandmatesSubmitButton" />
                        </form>
                    </div>
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

export default connect(mapStateToProps)(CreateProfile);