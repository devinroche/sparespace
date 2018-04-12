import React, { Component } from "react"
import {Header, SubHeader, HomeButton, Row, Boxes, MainHeader} from "./Styles";
import {Link} from "react-router-dom"
import Footer from "./Footer/Footer";


class Home extends Component {


    render() {
        return(
			<div className="container">
				<Row className="row">
					<MainHeader className="col-md-5 col-sm-6">
						<Header>More Affordable Storage</Header>
						<SubHeader>
							Store your stuff in a fellow Zag's house or list your own space.
						</SubHeader>
						<Link to="/listings"><HomeButton href="#">View Nearby Storage Options</HomeButton></Link>
					</MainHeader>
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