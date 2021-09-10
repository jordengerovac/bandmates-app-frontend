import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { fetchAccessToken } from '../actions/authActions'
import { Link } from 'react-router-dom';
import { REGISTRATION_ATTEMPTED } from '../actions/types';
import store from '../store';
import { registerUser } from '../api/users';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password1: '',
            password2: '',
            registered: false,
            invalidFields: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentDidMount(){
        const data = {
            type: REGISTRATION_ATTEMPTED,
            payload: false
        }
        store.dispatch(data)
    }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormValidation() {
        var formIsValid = true
        let invalidFields = {}
        let errors = {}

        if (this.state.username === '') {
            errors["username"] = "Email must not be empty";
            invalidFields["username"] = true
            formIsValid = false
        }

        if (this.state.firstname === '') {
            errors["firstname"] = "First name must not be empty";
            invalidFields["firstname"] = true
            formIsValid = false
        }

        if (this.state.lastname === '') {
            errors["lastname"] = "Last name must not be empty";
            invalidFields["lastname"] = true
            formIsValid = false
        }

        if (this.state.username !== '') {
            let lastAtPos = this.state.username.lastIndexOf('@');
            let lastDotPos = this.state.username.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.username.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.username.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["username"] = "Email is not valid";
                invalidFields["username"] = true
                formIsValid = false
            }
        }

        if (this.state.password1.length < 8 || this.state.password2.length < 8) {
            errors["password"] = "Password must be at least 8 characters";
            invalidFields["password"] = true
            formIsValid = false
        }

        if (this.state.password1 !== this.state.password2) {
            errors["password"] = "Passwords are not equal";
            invalidFields["password"] = true
            formIsValid = false
        }

        this.setState({
            invalidFields: invalidFields,
            errors: errors
        })

        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formIsValid = this.handleFormValidation();
        if (formIsValid) {
            this.registerUser();
        }
    }

    async registerUser() {
        try {
            await registerUser(this.state.firstname, this.state.lastname, this.state.username, this.state.password1)
            this.setState({
                registered: true
            })
        } catch (error) {
            let errors = {}
            errors["register"] = "An error occurred during registration"
            this.setState({
                errors: errors
            })
        }
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
                        {this.state.invalidFields["firstname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["firstname"]}</p> : null}
                        <input type="text" placeholder="first name" value={this.state.firstname} onChange={this.handleChange} name="firstname"></input>

                        {this.state.invalidFields["lastname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["lastname"]}</p> : null}
                        <input type="text" placeholder="last name" value={this.state.lastname} onChange={this.handleChange} name="lastname"></input>

                        {this.state.invalidFields["username"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["username"]}</p> : null}
                        <input type="text" placeholder="email" value={this.state.username} onChange={this.handleChange} name="username"></input>
                        <hr style={{color: 'white', margin: '30px 30vw'}}/>

                        {this.state.invalidFields["password"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["password"]}</p> : null}
                        <input type="password" placeholder="password" value={this.state.password1} onChange={this.handleChange} name="password1"></input>
                        <input type="password" placeholder="retype password" value={this.state.password2} onChange={this.handleChange} name="password2" invalid="true"></input>
                        <input type="submit" value="Submit" className="bandmatesSubmitButton" />
                    </form>
                </div>
                {this.props.authDetails.invalid_registration ? <p style={{color: 'red'}}>An error occurred during registration (email may already be taken)</p> : null}
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