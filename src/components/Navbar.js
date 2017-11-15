import React, { Component } from "react"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Route, Redirect } from "react-router-dom"
import Login from "./Login"
import LoggedIn from "./LoggedIn"
import Home from "./Home"
import SignUp from "./SignUp"
import Listing from './Listing'
import CreateListing from "./CreateListing"
import Listings from "./Listings"
import ImageUpload from "./ImageUpload"
import Cookies from "../Cookies"

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
						{/* <LinkContainer to="/"> */}
							<a href="/home">sparespace</a>
						{/* </LinkContainer> */}
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					{/*here link container acts just like Link from react-router, but for react-router-bootstrap'*/}
					{this.renderLogout()}
					<LinkContainer to="/create_listing">
						<NavItem eventKey={3}>Create a Listing!</NavItem>
					</LinkContainer>
					<LinkContainer to="/listings">
						<NavItem eventKey={3}>View Listings</NavItem>
					</LinkContainer>
				</Nav>
        </Navbar>

				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/login" component={Login}/>
				<Route path="/home" component={Home}/>
				<Route path="/create_listing" component={CreateListing} />
				<Route path="/add_photos" component={ImageUpload} />

			<Route path="/listings" component={Listings}>{" "}</Route>

			<Route path="/users/:id" component={LoggedIn} />
        	<Route path="/listing/:id" component={Listing} />
			<Route path="/sign_up" component={SignUp}>{" "}</Route>
        </div>
		)
	}
}
