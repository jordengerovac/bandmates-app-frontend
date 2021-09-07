import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/bandmates_logo.png'

class Welcome extends React.Component {
    render() {
        return(
            <div className="App">
                <h2>Bandmates</h2>
                <img src={logo} style={{width: '250px'}}/>
                <div>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div>
            </div>
        )
    }
}

export default Welcome;
