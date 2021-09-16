import '../App.css';
import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from  'react-redux';
import NavigationBar from './NavigationBar';
import { createBOTBForUser } from '../api/botb';
import { v4 as uuid } from 'uuid';

class CreateBOTB extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            urlSlug: '',
            startDate: '',
            endDate: '',
            successfulSubmission: false,
            invalidFields: {},
            errors: {},
            loading: true,
            submitting: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);
        this.createBOTB = this.createBOTB.bind(this);
    }

    handleChange(e) {    
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormValidation() {
        var formIsValid = true
        let invalidFields = {}
        let errors = {}

        if (this.state.name === '') {
            errors["name"] = "Name must not be empty";
            invalidFields["name"] = true
            formIsValid = false
        }

        this.setState({
            invalidFields: invalidFields,
            errors: errors
        })

        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formIsValid = this.handleFormValidation();
        if (formIsValid) {
            this.setState({
                submitting: true
            })
            this.createBOTB();
        }
    }

    async createBOTB() {
        var startDate = new Date();
        var endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const botb = {
            name: this.state.name,
            urlSlug: uuid(),
            startDate: startDate.toString(),
            endDate: endDate.toString()
        };

        try {
            await createBOTBForUser(this.props.authDetails.username, botb, this.props.authDetails.bandmates_access_token)
            this.setState({
                successfulSubmission: true
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/" />
        }

        return(
            <div>
                <NavigationBar key={this.state.successfulProfileSubmission}/>
                <div className="App">
                    {this.state.successfulSubmission ? <p>You have successfully created a Battle of the Bands group! Click <Link to="/botb-dashboard" style={{textDecoration: 'none', color: '#008216'}}>here</Link> to view your groups</p> : 
                        <div>
                            <h2>Create New Battle of the Bands Group</h2>
                            <form className="bandmatesSignUp" onSubmit={this.handleSubmit}>
                                {this.state.invalidFields["name"] ? <p style={{color: 'red', margin: '0px'}}>{this.state.errors["name"]}</p> : null}
                                <input type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} name="name"></input>

                                <input type="submit" value={this.state.submitting ? "Submitting..." : "Submit"} className="bandmatesSubmitButton" disabled={this.state.submitting ? true : false} />
                            </form>
                        </div> 
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

export default connect(mapStateToProps)(CreateBOTB);