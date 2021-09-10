import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { fetchAccessToken } from '../actions/authActions'
import { Redirect } from 'react-router-dom'
import { LOGIN_ATTEMPTED } from '../actions/types';
import store from '../store';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLoginAttempted: false,
            username: '',
            password: '',
            accessToken: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTokens = this.getTokens.bind(this);
    }

    componentDidMount(){
        const data = {
            type: LOGIN_ATTEMPTED,
            payload: false
        }
        store.dispatch(data)
    }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getTokens(this.state.username, this.state.password)
    }

    getTokens(username, password) {
        this.props.fetchAccessToken(username, password)
    }

    render() {
        if (this.props.authDetails.authenticated) {
            return <Redirect to="/home" />
        }
        else {
            return(
                <div className="App">
                    <h2>Login</h2>
                    <div style={{textAlign: 'center'}}>
                        <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="email" value={this.state.username} onChange={this.handleChange} name="username"></input>
                            <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"></input>
                            <input type="submit" value="Submit"  className="bandmatesSubmitButton"/>
                        </form>
                    </div>
                    {this.props.authDetails.invalid_login ? <p style={{color: 'red'}}>Invalid username or password</p> : null}
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

export default connect(mapStateToProps, { fetchAccessToken })(Login);