import '../App.css';
import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { getQueriedUsers } from '../api/users';

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
                                    <p>{user.username}</p>
                                </div>
                                <div>
                                {(user.profile !== null ?
                                    <Link to={'/profile/' + user.profile.id}><button className="bandmatesButton">View Profiile</button></Link> 
                                    : null
                                )}
                                </div>
                            </div>
                        )}) : <p>No search results</p> : null}
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
