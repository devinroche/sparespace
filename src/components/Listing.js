import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import Cookies from "../Cookies"
import swal from "sweetalert"

class LoggedIn extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3001/listing/${this.props.match.params.id}`)
			.then(res => this.setState({ listing: res.data }))
			.catch(err => console.log("some err occured", err))
	}

	render() {
		console.log("some proppppppps", this.props)
		const listing = this.state.listing ? this.state.listing : ""
		const listingImages= listing.images ? listing.images: ""

		return (
			<div className="text-center" style={{ marginTop: 100 }}>
				<h3>Title: {listing.title}</h3>
				<h3>Price: {listing.price}</h3>
				<h3>Description: {listing.description}</h3>
				<Image cloudName="dopxmkhbr" publicId={listingImages[0]} width="200"/>
				<br/>
				<br/>
				<button className="btn btn-success" onClick={() => {
						console.log("fart")
						swal({
							title: "An email expressing your interest has been sent!",
							icon: "success"
						})
						
					}}>Express Interest</button>
			</div>
		)
	}
}

export default LoggedIn
