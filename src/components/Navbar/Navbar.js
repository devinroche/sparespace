import React, { Component } from "react"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Cookies from "../../Cookies"


export default class AppNavbar extends Component {
	constructor(props){
		super(props);
	
		this.renderLogout = this.renderLogout.bind(this);
		this.logout = this.logout.bind(this);
    }
	
	logout(){
		Cookies.removeCookie();
	}
	
	renderLogout(){
		if(Cookies.isLoggedIn())
			return (
				<LinkContainer onClick={this.logout}  to="/login" activeClassName="none">
					<NavItem eventKey={2}>Logout</NavItem>
				</LinkContainer>
			);
		
		else{
			const notValid = (
				<Nav>
					<LinkContainer to="/login" activeClassName="none">
						<NavItem eventKey={2}>Login</NavItem>
					</LinkContainer>
					<LinkContainer to="/sign_up">
						<NavItem eventKey={3}>Sign Up</NavItem>
					</LinkContainer>
				</Nav>
			)
			return (notValid);
		}
	}
	componentDidMount(){
		this.renderLogout();
	}

	render() {
		return (
      <div>
		    <Navbar>
				<Navbar.Header>
					<Navbar.Brand>
                        <a href="/home">sparespace</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					{this.renderLogout()}
					<LinkContainer to="/create_listing">
						<NavItem eventKey={3}>Create a Listing!</NavItem>
					</LinkContainer>
					<LinkContainer to="/listings">
						<NavItem eventKey={3}>View Listings</NavItem>
					</LinkContainer>
				</Nav>
            </Navbar>
        </div>
		)
	}
}
