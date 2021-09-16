import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getUser } from '../api/users';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BOTBDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: '',
            firstname:'',
            lastname: '',
            username: '',
            botb: [],
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
        console.log(this.state.botb)
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ?
                        <div style={{margin: 'auto', width: '60vw'}}>
                            <h2 style={{textAlign: 'center', marginBottom: '25px'}}>Your Battle of The Bands Groups</h2>
                            {this.state.botb.length === 0 ? 
                                <div>
                                    <p>You are not in any Battle of the Bands groups</p>
                                </div> : 
                                <div>
                                    {this.state.botb.map((botb, i) => {
                                        return(
                                            <div>
                                                <p>{botb.name} / {botb.urlSlug}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            <Link to='/create-botb'><Button style={{margin: '25px'}} className="addBOTBButton">Create New Group</Button></Link>
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

export default connect(mapStateToProps)(BOTBDashboard);
