import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import logo from '../images/bandmates_logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../api/users';

class NavigationBar extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
            profile: {},
            activeKey: '',
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        this.getUserProfile();
        // set active key
        this.setState({
            activeKey: window.location.pathname
        })
        // set search bar text
        if (window.location.pathname.substring(window.location.pathname.indexOf("/") + 1) === "search") {
            this.setState({
                query: window.location.search.substring(window.location.search.indexOf("?") + 1)
            })
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.inputElement.click();
          }
    } 

    async getUserProfile() {
        try {
            const result = await getUserProfile(this.props.authDetails.username, this.props.authDetails.bandmates_access_token);
            this.setState({
                profile: result.data,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <Navbar className="bandmatesNavbar" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="/home">
                    <img src={logo} alt="navbar-logo" style={{width: '40px', borderRadius: '50%', marginLeft: '20px'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" style={{marginRight: '20px'}} />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px'}}
                        navbarScroll
                        activeKey={this.state.activeKey}
                    >
                        <Nav.Link as={Link} to="/home" className={this.state.activeKey === "/home" ? "bandmatesNavbarLinkActive" : "bandmatesNavbarLink"}>Home</Nav.Link>
                        <Nav.Link  as={Link} to="/botb" className={this.state.activeKey === "/botb" ? "bandmatesNavbarLinkActive" : "bandmatesNavbarLink"}>BOTB</Nav.Link>
                        <NavDropdown title="Profile" id={this.state.activeKey.includes("profile") || this.state.activeKey.includes("spotify") ? "navbarScrollingDropdownActive" : "navbarScrollingDropdown"}>
                            {!this.state.loading && Object.keys(this.state.profile).length === 0 ? 
                                <NavDropdown.Item as={Link} to="/update-profile" className="bandmatesNavbarLink">Create Profile</NavDropdown.Item> : 
                                <>
                                <NavDropdown.Item as={Link} to={"/profile/" + this.state.profile.id} className="bandmatesNavbarLink">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/update-profile" className="bandmatesNavbarLink">Update Profile</NavDropdown.Item>
                                </>
                            }
                            {!this.state.loading && Object.keys(this.state.profile).length !== 0 ? 
                                <NavDropdown.Item as={Link} to="/spotify-data" className="bandmatesNavbarLink">Spotify Data</NavDropdown.Item> : null
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/logout" className="bandmatesNavbarLink">Logout</NavDropdown.Item>
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
                        <Link to={'/search?' + this.state.query}><Button ref={input => this.inputElement = input} className="bandmatesSearchButton">Search</Button></Link>
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
