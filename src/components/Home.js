import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';

class Home extends React.Component {
    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div style={{height: '200vh'}}>
                <NavigationBar />
                <div className="App">
                    <h2>Bandmates</h2>
                    <p>Welcome to the Bandmates app</p>
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
