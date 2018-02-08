import React, { Component } from "react"
import Cookies from "../../Cookies"
import {Link} from "react-router-dom"
import styled from "styled-components";



export default class AppNavbar extends Component {

    constructor(props){
        super(props);
    	this.state = {
    		hover: false
		};

        this.renderLogout = this.renderLogout.bind(this);
        this.logout = this.logout.bind(this);
        this.renderSignUp = this.renderSignUp.bind(this);
        this.renderSignOut = this.renderSignOut.bind(this);
    }

    logout(){
        Cookies.removeCookie();
    }


    renderLogout(){
        if(Cookies.isLoggedIn()) {

            return (
					<li className= "col-sm-2">
						<Link to={"/users/" + Cookies.getId()} activeClassName="none"><NavItem className="" href="#">Account</NavItem></Link>
					</li>
            );
        }

        else{
            return (
	            	<li className= "col-sm-2">
						<Link to="/login" activeClassName="none"><NavItem className="" href="#">Log In</NavItem></Link>
					</li>
            )
        }
    }

    renderSignUp(){
        if(!Cookies.isLoggedIn()) {

            return (
                <li className= "col-sm-2">
					<Link to="/sign_up"><NavItem href="#">Sign Up</NavItem></Link>
                </li>
            )
        }

    }

    renderSignOut(){
    	if(Cookies.isLoggedIn()){
    		return (

            <li className= "col-sm-2">
                <Link onClick={this.logout} to="/login" activeClassName="none"><NavItem href="#">Logout</NavItem></Link>
            </li>
			)
		}
	}

    componentDidMount(){
        this.renderLogout();
    }

    render() {

        return (
        	<div className="container">
				<div className="row">
					<div className="col-sm-5">
						<Logo className="navbar-brand" href="/home">sparespace</Logo>
					</div>
					<div className="col-sm-7">
							<ul className="list-inline" style={{marginTop: "40"}}>
								<li className="col-sm-4">
									<Link to ="/create_listing"><PostSpace className="" href="#">Post Your Space</PostSpace></Link>
								</li>
								<li className= "col-sm-2">
									<Link to ="/listings"><NavItem className="" href="#">Browse</NavItem></Link>
								</li>
                                {this.renderLogout()}
								{this.renderSignUp()}
								{this.renderSignOut()}
							</ul>
					</div>
				</div>
			</div>
        )
    }
}




const Logo = styled.a`
	font-family: "Helvetica", "Arial", "sans-serif";
	color: #FC5B45;
	font-weight: bold;
	font-size: 30px;
	margin-left: 40px;
	margin-top: 25px;
	text-decoration: none;	
	:hover{
			color: #FC5B45;
			text-decoration: #FC5B45;
		}

`;

const NavItem = styled.a`

	font-family: "Helvetica", "Arial", "sans-serif";
	font-size: 16px;
	font-weight: 400;
	text-decoration: none;
	color: #333333;
	:hover{

			color: #333333;
			text-decoration: #333;
		}
`;

const PostSpace = styled.a`

	color: #FC5B45;
	background-color: #FFF;
	border-width: thin;
	border-style: solid;
	border-color: #FC5B45;
	padding: 7px 15px;
	text-decoration: none;
	border-radius: 3px;
	:hover{
			background-color: #FC5B45;
			color: #FFF;
			text-decoration: #FC5B45;
		}
	
	@media(max-width: 768px) {
				padding: 4px 10px;
				font-size: 11px;
  			}
`;
