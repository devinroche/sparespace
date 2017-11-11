/**
 * Home Page
 *
 * @author David Hanany
 * @version v0.0.1 10/01/17
 *
 * @ChangeLog
 *
 * Initial 10/01/17 David Hanany
 *
 */

import React, { Component } from "react"
import axios from "axios"
import { Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap"

//this was Search Bar class, renamed to be home

class Home extends Component {
	constructor(props) {
		// no idea just stole this from crypto chart to demo axios.
		super(props)
		this.state = {
			dataArr: []
		}
		this.getData = this.getData.bind(this)
	}

	componentDidMount() {
		this.getData()
	}

	getData() {
		// This gets all the users in the database
		axios.get("http://localhost:3001/users").then(response => {
			console.log(response.data)
			this.setState({
				dataArr: response.data
			})
		})
	}

	render() {
		return (
			<div>
				<Row style={{ marginTop: "25%" }}>
					<Col sm={8} smdOffset={2} className={"text-center col-sm-offset-2"}>
						<FormGroup controlId="formBasicText">
							<ControlLabel style={{ fontSize: "22px", marginBottom: "20px" }}>
								Save up to 50% in storage cost by using SpareSpace.
							</ControlLabel>
							<FormControl type="text" placeholder="Zip code" />
						</FormGroup>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Home
