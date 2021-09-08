import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import logo from '../images/bandmates_logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

class NavigationBar extends React.Component {
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
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2 bandmatesSearchBar"
                            aria-label="Search"
                        />
                        <Button className="bandmatesSearchButton">Search</Button>
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
