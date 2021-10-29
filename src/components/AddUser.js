import '../App.css';
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from  'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { getQueriedUsers } from '../api/users';
import { GiDrum, GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { ImHeadphones } from 'react-icons/im';
import { IoIosMicrophone } from 'react-icons/io';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            queriedUsers: [],
            query: ''
        }
        this.getQueriedUsers = this.getQueriedUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnterClicked = this.handleEnterClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    async getQueriedUsers(query) {
        try {
            const users = await getQueriedUsers(query, this.props.authDetails.bandmates_access_token)
            this.setState({
                queriedUsers: users.data
            })
        } catch (error){
            console.log(error)
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleEnterClicked(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.inputElement.click();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getQueriedUsers(this.state.query);
    } 

    handleAddUser(username) {
        this.props.addUser(username);
        this.props.modalPopup();
    }

    render() {
        if (!this.props.authDetails.authenticated) {
            return <Redirect to="/login" />
        }

        return(
            <div>
                <Modal
                show={this.props.showModal}
                onHide={this.props.modalPopup}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Search for a user
                    </Modal.Title>
                    <Form className="form-flex" style={{margin: '0 0 0 20px'}}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2 bandmatesSearchBar"
                        aria-label="Search"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                        onKeyDown={this.handleEnterClicked}
                    />
                    <Button ref={input => this.inputElement = input} onClick={this.handleSubmit} className="bandmatesSearchButton">Search</Button>
                </Form>
                </Modal.Header>
                <Modal.Body>
                {this.state.queriedUsers.map((user, i) => {
                    return(
                        <div className="userSearchResult addUser"  key={i}>
                            <div>
                                <p>{user.firstname} {user.lastname}</p>
                                <p>
                                    {user.username}&nbsp;
                                    {user.profile ? 
                                        <div style={{display: 'inline'}}>
                                            {user.profile.instrument === 'drums' ? <GiDrum /> : null}
                                            {user.profile.instrument === 'bass' ? <GiGuitarBassHead /> : null}
                                            {user.profile.instrument === 'guitar' ? <GiGuitarHead /> : null}
                                            {user.profile.instrument === 'vocals' ? <IoIosMicrophone /> : null}
                                            {user.profile.instrument === 'listener' ? <ImHeadphones /> : null}
                                        </div>
                                    : null
                                    }
                                </p>
                            </div>
                            <button className="addTrackButton" onClick={() => this.handleAddUser(user.username)}><AiOutlinePlus /></button>
                        </div>
                    )
                })}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.modalPopup} className="bandmatesCloseButton">Close</button>
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(AddUser);
