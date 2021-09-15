import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getUser } from '../api/users';

class BOTB extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: '',
            firstname:'',
            lastname: '',
            username: '',
            botb: '',
            userId: '',
            loading: true
        }
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        try {
            const result = await getUser(this.props.authDetails.username, this.props.authDetails.bandmates_access_token);
            this.setState({
                profile: result.data.profile,
                firstname: result.data.firstname,
                lastname: result.data.lastname,
                username: result.data.username,
                botb: result.data.botb,
                userId: result.data.id,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ?
                        <div>
                            <h2>Battle of The Bands</h2>
                            {this.state.botb !== '' ? 
                            <div>
                                <p>Create a botb group</p>
                                <button>Create</button>
                            </div> : 
                            <div>
                                <p>You already created a botb group</p>
                            </div>}
                        </div>
                    : <BeatLoader color='#01961a' />
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

export default connect(mapStateToProps)(BOTB);
