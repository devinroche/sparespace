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

class Home extends Component {

	render() {

		const font = {
			fontFamily: 'Rubik',
			fontWeight: "700",
			fontSize: 55,
			width: 200,
			color: "#333333"
		};

		const subHeader = {
			fontFamily: 'Rubik',
			fontWeight: "300",
			fontSize: 22,
			width: 450,
			lineHeight: 1.4,
			color: "#666666",
			marginBottom: 30
		};

		const link = {
			fontFamily: 'Rubik',
			backgroundColor: "#FC5B45",
			fontWeight: "300",
			fontSize: 21,
			textAlign: "center",
			color: "#FFFFFF",
			padding: "18px 35px",
			textDecoration: "none",
            display: "inline-block",
			borderRadius: 5

		}

		return (
			<div className="container">
				<div className="row" style={{marginTop: 50, marginLeft: 50}}>
					<h1 style={font}>More Affordable Storage</h1>
					<h2 style={subHeader}>sparespace is a new storage system that gets you cheaper and secure storage</h2>
					<a href="#" style={link}>View Nearby Storage Options</a>
				</div>
			</div>
		)
	}
}

export default Home
