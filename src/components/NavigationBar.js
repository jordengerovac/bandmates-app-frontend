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
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        this.getUserProfile();
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
                            {Object.keys(this.state.profile).length === 0 ? 
                                <NavDropdown.Item href="/update-profile">Profile</NavDropdown.Item> : 
                                <NavDropdown.Item href={"/profile/" + this.state.profile.id}>Profile</NavDropdown.Item>
                            }
                                <NavDropdown.Item href="/update-profile">Update Profile</NavDropdown.Item>
                            {Object.keys(this.state.profile).length !== 0 ? 
                                <NavDropdown.Item href="/spotify-data">Spotify Data</NavDropdown.Item> : null
                            }
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
