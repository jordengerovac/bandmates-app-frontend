import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import BeatLoader from "react-spinners/BeatLoader";
import { getBOTBByUrlSlug } from '../api/botb';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BOTB extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            tracks: [],
            votes: [],
            loading: true
        }
        this.getBOTB = this.getBOTB.bind(this);
    }

    componentDidMount() {
        const urlSlug = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        this.getBOTB(urlSlug);
    }

    async getBOTB(urlSlug) {
        try {
            const result = await getBOTBByUrlSlug(urlSlug, this.props.authDetails.bandmates_access_token);
            this.setState({
                name: result.data.name,
                startDate: result.data.startDate,
                endDate: result.data.endDate,
                tracks: result.data.username,
                votes: result.data.botb,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <NavigationBar />
                <div className="App">
                    {!this.state.loading ?
                        <div style={{margin: 'auto', width: '60vw'}}>
                            <h2 style={{textAlign: 'center', marginBottom: '25px'}}>{this.state.name}</h2>
                            <Link to='/add-track'><Button style={{margin: '25px'}} className="addBOTBButton">Add Track</Button></Link>
                        </div>
                    : <BeatLoader color='#01961a' />
                    }
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

export default connect(mapStateToProps)(BOTB);
