import React, { Component } from "react"
import {Header, SubHeader, HomeButton, Row, Boxes} from "./Styles";
import {Link} from "react-router-dom"
import Footer from "./Footer/Footer";


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
					<div className="col-md-6 col-md-offset-1 col-sm-6">
                        <Boxes src={require('../images/illustration.svg')}/>
                    </div>
				</Row>
                <Footer/>
			</div>
		)
	}
}

export default Home;