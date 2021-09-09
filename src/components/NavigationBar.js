import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import logo from '../images/bandmates_logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location.replace('/search?' + this.state.query);
          }
    } 

    render() {
        return(
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="/home">
                    <img src={logo} alt="navbar-logo" style={{width: '40px', borderRadius: '50%', marginLeft: '20px'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" style={{marginRight: '20px'}} />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/botb">BOTB</Nav.Link>
                        <NavDropdown title="Profile" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/edit-profile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/spotify-data">Spotify Data</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" style={{margin: '0 0 0 20px'}}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2 bandmatesSearchBar"
                            aria-label="Search"
                            name="query"
                            value={this.state.query}
                            onChange={this.handleChange}
                            onKeyDown={this.handleSubmit}
                        />
                        <Link to={'/search?' + this.state.query}><Button className="bandmatesSearchButton">Search</Button></Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(NavigationBar);
