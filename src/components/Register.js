import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { fetchAccessToken } from '../actions/authActions'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password1: '',
            password2: '',
            registered: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
      }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password1 === this.state.password2) {
            this.registerUser()
            this.setState({
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                password1: '',
                password2: '',
                registered: true

            })
        }
        else {
            console.log("passwords not equal")
        }
    }

    registerUser() {
        axios.post('/api/v1/users/create', { 
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password1,
            roles: [] 
        })
        .then(res => {
            console.log("registering...")
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.registered) {
            return (
                <div className="App">
                    <p>You have successfully registered! Click <Link to="/login" style={{textDecoration: 'none', color: '#008216'}}>here</Link> to login</p>
                </div>
            )
        }

        return(
            <div className="App">
                <h2>Register</h2>
                <div>
                    <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="first name" value={this.state.firstname} onChange={this.handleChange} name="firstname"></input>
                        <input type="text" placeholder="last name" value={this.state.lastname} onChange={this.handleChange} name="lastname"></input>
                        <input type="text" placeholder="email" value={this.state.email} onChange={this.handleChange} name="email"></input>
                        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"></input>
                        <hr style={{color: 'white', margin: '30px 30vw'}}/>
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