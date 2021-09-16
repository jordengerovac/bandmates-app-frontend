import '../App.css';
import React from 'react';
import { connect } from  'react-redux';

class AddTrack extends React.Component {
    render() {
        return(
            <div>
                <p>Add Track</p>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(AddTrack);