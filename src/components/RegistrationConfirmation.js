import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { Redirect } from 'react-router-dom'
import { confirmRegisteredUser } from '../api/users';
import BeatLoader from "react-spinners/BeatLoader";

class RegistrationConfirmation extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            loading: true
        }
    }

    componentDidMount() {
        // get code after the ?token=
        const confirmationCode = window.location.search.substring(7)
        this.confirmRegistration(confirmationCode);
    }

    async confirmRegistration(code) {
        try {
            const result = await confirmRegisteredUser(code, this.props.authDetails.bandmates_access_token);
            this.setState({
                user: result.data,
                loading: false
            })
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if (!this.state.loading && this.state.user !== '') {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <div className="App">
                    {this.state.loading ? <BeatLoader color='#01961a' /> : 
                        this.state.user !== '' ? <p>Account confirmed</p> : <p>An error occurred when registering this user</p>
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

export default connect(mapStateToProps)(RegistrationConfirmation);
