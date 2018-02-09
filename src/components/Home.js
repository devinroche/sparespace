import React, { Component } from "react"
import {Header, SubHeader, Link, Row} from "./Styles";

class Home extends Component {

    render() {

		return(
			<div className="container">
				<Row className="row">
					<div className="col-md-5 col-sm-6">
						<Header>More Affordable Storage</Header>
						<SubHeader>sparespace is a new storage system that gets you cheaper and secure storage</SubHeader>
						<Link href="#">View Nearby Storage Options</Link>
					</div>
				</Row>
			</div>
		)
	}
}

export default Home;