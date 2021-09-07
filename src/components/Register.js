import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { fetchAccessToken } from '../actions/authActions'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            password1: '',
            password2: '',
            accessToken: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTokens = this.getTokens.bind(this);
      }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getTokens(this.state.username, this.state.password)
        this.setState({
            fullname: '',
            username: '',
            password1: '',
            password2: ''
        })
    }

    getTokens(username, password) {
        this.props.fetchAccessToken(username, password)
    }

    render() {
        return(
            <div className="App">
                <h2>Register</h2>
                <div>
                    <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="full name" value={this.state.fullname} onChange={this.handleChange} name="fullname"></input>
                        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"></input>
                        <input type="password" placeholder="password" value={this.state.password1} onChange={this.handleChange} name="password1"></input>
                        <input type="password" placeholder="retype password" value={this.state.password2} onChange={this.handleChange} name="password2"></input>
                        <input type="submit" value="Submit" className="bandmatesSubmitButton" />
                    </form>
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

export default connect(mapStateToProps, { fetchAccessToken })(Register);