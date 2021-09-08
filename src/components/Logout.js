import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { logout } from '../actions/authActions'
import { Link, Redirect } from 'react-router-dom'

class Logout extends React.Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        return(
            <div className="logoutModal">
                <h4 style={{marginTop: '30px'}}>Logout of Bandmates?</h4>
                <button className="bandmatesButton" onClick={this.handleLogout}>Logout</button>
                <Link to="/home"><button className="bandmatesButton">Cancel</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authDetails: state.authDetails
    }
}

export default connect(mapStateToProps, { logout })(Logout);