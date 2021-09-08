import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { fetchAccessToken } from '../actions/authActions'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
            username: '',
            password: ''
        })
    }

    getTokens(username, password) {
        this.props.fetchAccessToken(username, password)
    }

    render() {
        if (this.props.authDetails.authenticated) {
            return <Redirect to="/home" />
        }

        return(
            <div className="App">
                <h2>Login</h2>
                <div style={{textAlign: 'center'}}>
                    <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"></input>
                        <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"></input>
                        <input type="submit" value="Submit"  className="bandmatesSubmitButton"/>
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

export default connect(mapStateToProps, { fetchAccessToken })(Login);