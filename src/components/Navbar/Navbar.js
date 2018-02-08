import React, { Component } from "react"
import Cookies from "../../Cookies"
import {Link} from "react-router-dom"


export default class AppNavbar extends Component {
    constructor(props){
        super(props);
    	this.state = {
    		hover: false
		};

        this.renderLogout = this.renderLogout.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleHover = this.toggleHover.bind(this);

    }

    logout(){
        Cookies.removeCookie();
    }


    renderLogout(){
        if(Cookies.isLoggedIn()) {

            const style = {
                color: "#333333",
                listStyleType: "none",
                fontFamily: "Rubik",
                fontWeight: "400",
                fontSize: 16,
                float: "left",
                marginRight: 30,
                textDecoration: "none"
            };

            return (
            	<div>
                    <Link to={"/users/" + Cookies.getId()}>
                        <li className="nav-item" style={style}>
                            <a className="nav-link" style={style}>Account</a>
                        </li>
                    </Link>
					<Link onClick={this.logout} to="/login" >
						<li className="nav-item" style={style}>
							<a className="nav-link" style={style}>Logout</a>
						</li>
					</Link>
				</div>

            );
        }

        else{
            const style = {
                color: "#333333",
                listStyleType: "none",
				fontFamily: "Rubik",
				fontWeight: "400",
				fontSize: 16,
                float: "left",
				marginRight: 30,
                textDecoration: "none"
            };
            return (
            	<div>
					<Link to="/login">
						<li className="nav-item" style={style}>
							<a className="nav-link" style={style}>Log In</a>
						</li>
					</Link>
					<Link to="/sign_up">
						<li className="nav-item" style={style}>
							<a className="nav-link" style={style}>Sign Up</a>
						</li>
					</Link>
				</div>
            )
        }
    }
    componentDidMount(){
        this.renderLogout();
    }

    toggleHover()
	{
		this.setState({
			hover: !this.state.hover
		})
    }


    render() {

    	const style = {
    		fontFamily: "Helvetica",
			color: "#FC5B45",
			fontWeight: "bold",
			fontSize: 30,
			marginLeft: 40,
			marginTop: 25,
			textDecoration: "none"
		};

    	const itemStyles = {
    		listStyleType: "none",
			fontFamily: "Rubik",
			fontSize: 16,
			fontWeight: 400,
			float: "left",
			marginRight: 45,
            textDecoration: "none"
		};


    	const ul = {
    		width: 600,
			marginTop: 40,
		}

    	const item = {
            color: "#333333",
            textDecoration: "none"
		}

		let yourSpace = {

		}

		if(this.state.hover){
    		yourSpace = {
    			color: "#FFFFFF",
				backgroundColor: "#FC5B45",
                borderWidth: "thin",
				borderColor: "#FC5B45",
				borderStyle: "solid",
                padding: "7px 15px",
                borderRadius: 3,
                textDecoration: "none"
			}
		}
		else{
            yourSpace = {
                color: "#FC5B45",
				borderColor: "#FC5B45",
				borderWidth: "thin",
                borderStyle: "solid",
                padding: "7px 15px",
                borderRadius: 3,
                textDecoration: "none"
            }
		}


        return (
				<nav className="navbar">
                    <a className="navbar-brand" style={style} href="/home">sparespace</a>
					<ul className="pull-right navbar-nav" style={ul}>
						<Link to ="/create_listing">
							<li className="nav-item" style={itemStyles}>
								<a className="nav-link" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} style={yourSpace}>Post Your Space</a>
							</li>
						</Link>
						<Link to ="/listings">
							<li className="nav-item" style={itemStyles}>
								<a className="nav-link" style={item}>Browse</a>
							</li>
						</Link>
						{this.renderLogout()}
					</ul>
				</nav>
        )
    }
}