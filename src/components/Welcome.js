import '../App.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/bandmates_logo.png'
import { connect } from  'react-redux';

class Welcome extends React.Component {
    render() {
        if (this.props.authDetails.authenticated) {
            return <Redirect to="/home" />
        }

        return(
            <div className="App">
                <img src={logo} alt="bandmates-logo" style={{width: '250px', borderRadius: '50%', margin: '20px'}}/>
                <div>
                    <Link to="/login"><button className="bandmatesButton">Login</button></Link>
                    <Link to="/register"><button className="bandmatesButton">Register</button></Link>
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

export default connect(mapStateToProps)(Welcome);
