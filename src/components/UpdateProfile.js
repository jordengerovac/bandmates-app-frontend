import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getUser, updateUser } from '../api/users'; 
import { createProfileForUser, updateProfile, uploadImageToProfile } from '../api/profiles';
import BeatLoader from "react-spinners/BeatLoader";
import IconSelection from './IconSelection';

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
            iconName: 'default',
            iconColour: 'white',
            location: '',
            instrument: 'guitar',
            image_preview: null,
            image_file: null,
            successfulImageUpload: false,
            successfulProfileSubmission: false,
            successfulUserSubmission: false,
            invalidFields: {},
            errors: {},
            loading: true,
            submitting: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.createProfile = this.createProfile.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    getLocation(e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: position.coords.latitude + "," + position.coords.longitude
            })
        });
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
            if (!this.state.loading) {
                this.setState({
                    submitting: true
                })
                if (this.state.profile === null) {
                    this.createProfile();
                    this.uploadImageToProfile();
                    this.updateUser();
                }
                else {
                    this.updateProfile();
                    this.uploadImageToProfile();
                    this.updateUser();
                }
            }
        }
    }

    async uploadImageToProfile() {
        if (this.state.image_file !== null) {
            try {
                await uploadImageToProfile(this.state.profile.id, this.state.image_file, this.props.authDetails.bandmates_access_token)
                this.setState({
                    successfulImageUpload: true
                })
            } catch(error) {
                console.log(error)
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
            if (result.profile !== null) {
                this.setState({
                    bio: result.data.profile.bio,
                    location: result.data.profile.location,
                    instrument: result.data.profile.instrument,
                    iconColour: result.data.profile.iconColour,
                    iconName: result.data.profile.iconName
                })
            }
        } catch(error) {
            console.log(error)
        }
    }

    async createProfile() {
        const profile = {
            bio: this.state.bio,
            location: this.state.location,
            iconName: this.state.iconName,
            iconColour: this.state.iconColour,
            instrument: this.state.instrument
        };

        try {
            await createProfileForUser(this.props.authDetails.username, profile, this.props.authDetails.bandmates_access_token)
            this.setState({
                successfulProfileSubmission: true
            })
        } catch(error) {
            console.log(error)
        }
    }

    async updateProfile() {
        const profile = {
            bio: this.state.bio,
            iconName: this.state.iconName,
            iconColour: this.state.iconColour,
            location: this.state.location,
            instrument: this.state.instrument
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

    handleImagePreview(e) {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        return(
            <div>
                <NavigationBar key={this.state.successfulProfileSubmission}/>
                <div className="App">
                    {!this.state.loading ? 
                        <div>
                        {this.state.successfulProfileSubmission && this.state.successfulUserSubmission  && (this.state.successfulImageUpload || this.state.image_file === null) ? <p>You have successfully edited your profile!</p> : 
                        <div>
                            {this.state.profile === null && !this.state.loading ? 
                                <h2>Create Profile</h2> :
                                <h2>Update Profile</h2>
                            }
                            <div>
                                <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                                    {this.state.invalidFields["firstname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["firstname"]}</p> : null}
                                    <input type="text" placeholder="first name" value={this.state.firstname} onChange={this.handleChange} name="firstname"></input>

                                    {this.state.invalidFields["lastname"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["lastname"]}</p> : null}
                                    <input type="text" placeholder="last name" value={this.state.lastname} onChange={this.handleChange} name="lastname"></input>

                                    {this.state.invalidFields["username"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["username"]}</p> : null}
                                    <input type="text" placeholder="email" value={this.state.username} onChange={this.handleChange} name="username"></input>
                                    <hr style={{color: 'white', margin: '30px 30vw'}}/>

                                    <div>
                                        {/*
                                        <label for="image">Upload a profile picture:</label>
                                        <input type="file" name="image" onChange={this.handleImagePreview}></input>
                                        */}

                                        <IconSelection handleChange={this.handleChange} iconColour={this.state.iconColour} iconName={this.state.iconName} />

                                        <textarea placeholder="bio" value={this.state.bio} onChange={this.handleChange} name="bio" defaultValue={this.state.profile !== null ? this.state.profile.bio : ''}></textarea>
                                        <div style={{margin: '40px 0'}}>
                                            <label for="location">Share your location to find nearby bandmates:</label>
                                            <input type="text" name="location" placeholder="location" value={this.state.location} defaultValue={this.state.profile !== null ? this.state.profile.location : ''} onChange={this.handleChange} disabled></input>
                                            <button className="bandmatesShareButton" onClick={this.getLocation}>Share</button>
                                        </div>
                                        <label for="instrument">The instrument you mainly play / want to learn:</label>
                                        <select onChange={this.handleChange} name="instrument" value={this.state.instrument !== "" ? this.state.instrument : "guitar"}>
                                            <option value="guitar">Guitar</option>
                                            <option value="drums">Drums</option>
                                            <option value="bass">Bass</option>
                                            <option value="vocals">Vocals</option>
                                            <option value="listener">I'm just a listener</option>
                                        </select>
                                        </div>
                                    <div style={{marginBottom: '35px'}}>
                                    </div>
                                    <input type="submit" value={this.state.submitting ? "Submitting..." : "Submit"} className="bandmatesSubmitButton" disabled={this.state.submitting ? true : false} />
                                </form>
                            </div>
                        </div>
                        }
                    </div> : <BeatLoader color='#01961a' />
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