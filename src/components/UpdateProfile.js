import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getUser, updateUser } from '../api/users'; 
import { createProfileForUser, updateProfile } from '../api/profiles';

class UpdateProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: null,
            userId: '',
            firstname: '',
            lastname: '',
            username: '',
            bio: '',
            successfulProfileSubmission: false,
            successfulUserSubmission: false,
            invalidFields: {},
            errors: {},
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.createProfile = this.createProfile.bind(this);
    }

    componentDidMount() {
        this.getUser();
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
            if (!this.state.loading && this.state.profile === null) {
                this.createProfile();
                this.updateUser();
            }
            else {
                this.updateProfile();
                this.updateUser();
            }
        }
    }

    async getUser() {
        try {
            const result = await getUser(this.props.authDetails.username, this.props.authDetails.bandmates_access_token);
            this.setState({
                profile: result.data.profile,
                firstname: result.data.firstname,
                lastname: result.data.lastname,
                username: result.data.username,
                userId: result.data.id,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    async createProfile() {
        const profile = {
            bio: this.state.bio
        };

        try {
            await createProfileForUser(this.props.authDetails.username, profile, this.props.authDetails.bandmates_access_token)
            this.setState({
                successfulProfileSubmission: true
            })
            console.log("success")
        } catch(error) {
            console.log(error)
        }
    }

    async updateProfile() {
        const profile = {
            bio: this.state.bio
        };

        try {
            await updateProfile(this.state.profile.id, profile, this.props.authDetails.bandmates_access_token)
            this.setState({
                successfulProfileSubmission: true
            })
        } catch(error) {
            console.log(error)
        }
    }

    async updateUser() {
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
        };

        try {
            await updateUser(this.state.userId, user, this.props.authDetails.bandmates_access_token)
            this.setState({
                successfulUserSubmission: true
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {this.state.successfulProfileSubmission && this.state.successfulUserSubmission ? <p>You have successfully edited your profile</p> : 
                    <div>
                        <h2 style={{marginTop: '30px'}}>Update Profile</h2>
                        <div>
                            <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                                {this.state.invalidFields["firstname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["firstname"]}</p> : null}
                                <input type="text" placeholder="first name" value={this.state.firstname} onChange={this.handleChange} name="firstname"></input>

                                 {this.state.invalidFields["lastname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["lastname"]}</p> : null}
                                <input type="text" placeholder="last name" value={this.state.lastname} onChange={this.handleChange} name="lastname"></input>

                                {this.state.invalidFields["username"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["username"]}</p> : null}
                                <input type="text" placeholder="email" value={this.state.username} onChange={this.handleChange} name="username"></input>
                                <hr style={{color: 'white', margin: '30px 30vw'}}/>

                                {this.state.profile !== null ? 
                                    <textarea placeholder="bio" value={this.state.bio} onChange={this.handleChange} name="bio" defaultValue={this.state.profile.bio}></textarea> :
                                    <textarea placeholder="bio" value={this.state.bio} onChange={this.handleChange} name="bio"></textarea>
                                }
                                <input type="submit" value="Submit" className="bandmatesSubmitButton" />
                            </form>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(UpdateProfile);