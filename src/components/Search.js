import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import axios from 'axios';

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

    getQueriedUsers(query) {
        axios.get('/api/v1/users/query/?search=' + '(firstname:\'*' + query + '*\' OR lastname:\'*' + query + '*\' OR username: \'*' + query + '*\')', { headers: {"Authorization" : `Bearer ${this.props.authDetails.bandmates_access_token}`} })
        .then(res => {
            this.setState({
                queriedUsers: res.data,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar queryUsers={this.getQueriedUsers} />
                <div className="App">
                    {!this.state.loading ? 
                        this.state.queriedUsers.length > 0 ? this.state.queriedUsers.map((user) => {
                        return(
                            <div className="userSearchResult">
                                <div>
                                    <p>{user.firstname} {user.lastname}</p>
                                    <p>{user.username}</p>
                                </div>
                                <div>
                                    <button className="bandmatesButton">View Profiile</button>
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
