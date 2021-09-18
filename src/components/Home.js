import '../App.css';
import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getAllProfiles } from '../api/profiles';
import { GiDrum, GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { ImHeadphones } from 'react-icons/im';
import { IoIosMicrophone } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import BeatLoader from "react-spinners/BeatLoader";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            profiles: [],
            loading: true
        }
        this.getProfiles = this.getProfiles.bind(this);
    }

    componentDidMount() {
        this.getProfiles();
    }

    async getProfiles() {
        try {
            const result = await getAllProfiles(this.props.authDetails.bandmates_access_token)
            this.setState({
                profiles: result.data,
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
                    <div style={{margin: '20px auto', width: '60vw'}}>
                    {this.state.profiles.length === 0 ? <h4>There's nobody else on Bandmates yet :(</h4> : null}
                        <div>
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {this.state.profiles.slice(0, 12).map((profile, i) => {
                                    if (profile.user.username !== this.props.authDetails.username) {
                                        return(
                                            <div>
                                                <h4 style={{textAlign: 'left'}}>Bandmates You May Know</h4>
                                                <div className="homePageCard">
                                                    {profile.image !== null ? 
                                                        <img alt="profilePicture" style={{width: '50px', height: '50px', borderRadius: '50%'}} src={profile.image} /> : 
                                                        <FaUserCircle color="gray" font-size="50px" />
                                                    }
                                                    <p>{profile.user.firstname} {profile.user.lastname}</p>
                                                    <p>{profile.user.username}&nbsp;
                                                        {profile.instrument === 'drums' ? <GiDrum /> : null}
                                                        {profile.instrument === 'bass' ? <GiGuitarBassHead /> : null}
                                                        {profile.instrument === 'guitar' ? <GiGuitarHead /> : null}
                                                        {profile.instrument === 'vocals' ? <IoIosMicrophone /> : null}
                                                        {profile.instrument === 'listener' ? <ImHeadphones /> : null}
                                                    </p>
                                                    <Link to={'/profile/' + profile.id}><button className="bandmatesSmallButton">View</button></Link> 
                                                </div>
                                            </div>
                                        )
                                    }
                                    else {
                                        return(null)
                                    }
                                })}
                            </div>
                        </div>
                    </div> : <BeatLoader color='#01961a' />}
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

export default connect(mapStateToProps)(Home);
