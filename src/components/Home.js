import React, { Component } from "react"
import {Header, SubHeader, HomeButton, Row} from "./Styles";
import {Link} from "react-router-dom"


class Home extends Component {

    render() {

		return(
			<div className="container">
				<Row className="row">
					<div className="col-md-5 col-sm-6">
						<Header>More Affordable Storage</Header>
						<SubHeader>sparespace is a new storage system that gets you cheaper and secure storage</SubHeader>
						<Link to="/listings"><HomeButton href="#">View Nearby Storage Options</HomeButton></Link>
					</div>
				</Row>
			</div>
		)
	}
}

export default Home;