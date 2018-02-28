import React, { Component } from "react"
import Cookies from "../../Cookies"
import {Link} from "react-router-dom"
import  {Logo, NavItem, PostSpace} from "../Styles";


export default class AppNavbar extends Component {

    constructor(){

        super();
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
                <li className= "col-lg-2 col-md-2 col-sm-2">
                    <Link to={"/users/" + Cookies.getId()} activeClassName="none"><NavItem className="" href="#">Account</NavItem></Link>
                </li>
            );
        }

        else{
            return (
                <li className= "col-lg-2 col-md-2 col-sm-2">
                    <Link to="/login" activeClassName="none"><NavItem className="" href="#">Log In</NavItem></Link>
                </li>
            )
        }
    }

    renderSignUp(){
        if(!Cookies.isLoggedIn()) {

            return (
                <li className= "col-lg-2 col-md-2 col-sm-2">
					<Link to="/sign_up"><NavItem href="#">Sign Up</NavItem></Link>
                </li>
            )
        }

    }

    renderSignOut(){
    	if(Cookies.isLoggedIn()){
    		return (
                <li className= "col-lg-2 col-md-2 col-sm-2">
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
        	<div className="container-fluid">
				<div className="row">
					<div className="col-lg-5">
						<Logo className="navbar-brand" href="/home">sparespace</Logo>
					</div>
					<div className="col-lg-6 col-md-offset-1 col-md-7 col-sm-7">
							<ul className="list-inline" style={{marginTop: "40"}}>
								<li className="col-lg-4 col-md-4 col-sm-4">
									<Link to ="/create_listing"><PostSpace className="" href="#">Post Your Space</PostSpace></Link>
								</li>
								<li className= "col-lg-2 col-md-2 col-sm-2">
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