import '../App.css';
import React from 'react';

class Welcome extends React.Component {
    render() {
        return(
            <div>
                <h2>Bandmates</h2>
                <div>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        )
    }
}

export default Welcome;
