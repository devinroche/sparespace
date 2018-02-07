import React, { Component } from "react"
import styled from "styled-components";

class Home extends Component {

	render() {

		return (
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

export default Home

const Header = styled.h1`
        	font-family: 'Rubik', 'Arial', 'sans-serif';
        	font-size: 55px;
        	font-weight: 700;
        	color: #333333;
        	
        	@media(min-width: 1440px) {
				font-size: 65px;
  			}
		`;

const SubHeader = styled.h2`
        	font-family: 'Rubik', 'Arial', 'sans-serif';
        	font-weight: 300;
        	font-size: 22px;
        	line-height: 1.4;
        	color: #666666;
        	margin-bottom: 30px;
        	
        	@media(min-width: 1440px) {
				font-size: 30px;
				margin-bottom: 50px;
  			}
        `;

const Link = styled.a`
			font-family: 'Rubik', 'Arial', 'sans-serif';
			background-color: #FC5B45;
			font-weight: 300;
			font-size: 21px;
			text-align: center;
			color: #FFF;
			padding: 18px 35px;
			text-decoration: none;
			border-radius: 5px;
			:hover{
				text-decoration: none;
				color: #FFF;
			}
			
			@media(min-width: 1440px) {
				font-size: 27px;
  			}
			
			@media(max-width: 768px) {
				font-size: 18px;
  			}
  			@media(max-width: 375px) {
				font-size: 15px;
  			}
  			@media(max-width: 320px) {
				font-size: 13px;
				padding: 10px 25px;
			
  			}
		
        `;

const Row = styled.div`
			margin-top: 50px;
			margin-left: 50px;
		`;
