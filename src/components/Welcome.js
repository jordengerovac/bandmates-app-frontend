import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/bandmates_logo.png'

class Welcome extends React.Component {
    render() {
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

export default Welcome;
