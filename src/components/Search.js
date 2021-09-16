import '../App.css';
import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getQueriedUsers } from '../api/users';
import BeatLoader from "react-spinners/BeatLoader";
import { GiDrum, GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { ImHeadphones } from 'react-icons/im';
import { IoIosMicrophone } from 'react-icons/io';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            queriedUsers: [],
            query: '',
            loading: true
        }
        this.getQueriedUsers = this.getQueriedUsers.bind(this);
    }

    componentDidMount() {
        this.setState({
            query: window.location.search.substring(1)
        })
        this.getQueriedUsers(window.location.search.substring(1))
    }

    componentDidUpdate(prevProps) {
        if (this.state.query !== window.location.search.substring(1)) {
            this.setState({
                query: window.location.search.substring(1)
            })
            this.getQueriedUsers(window.location.search.substring(1))
        }
    }

    async getQueriedUsers(query) {
        try {
            const users = await getQueriedUsers(query, this.props.authDetails.bandmates_access_token)
            this.setState({
                queriedUsers: users.data,
                loading: false
            })
        } catch (error){
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ? 
                        this.state.queriedUsers.length > 0 ? this.state.queriedUsers.map((user, i) => {
                        return(
                            <div className="userSearchResult" key={i}>
                                <div>
                                    <p>{user.firstname} {user.lastname}</p>
                                    <p>
                                        {user.username}&nbsp;
                                        {user.profile ? 
                                            <div style={{display: 'inline'}}>
                                                {user.profile.instrument === 'drums' ? <GiDrum /> : null}
                                                {user.profile.instrument === 'bass' ? <GiGuitarBassHead /> : null}
                                                {user.profile.instrument === 'guitar' ? <GiGuitarHead /> : null}
                                                {user.profile.instrument === 'vocals' ? <IoIosMicrophone /> : null}
                                                {user.profile.instrument === 'listener' ? <ImHeadphones /> : null}
                                            </div>
                                        : null
                                        }
                                    </p>
                                </div>
                                <div>
                                {(user.profile !== null ?
                                    <Link to={'/profile/' + user.profile.id}><button className="bandmatesButton">View Profile</button></Link> 
                                    : null
                                )}
                                </div>
                            </div>
                        )}) : <p>No search results</p> : <BeatLoader color='#01961a' />}
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

export default connect(mapStateToProps)(Search);
