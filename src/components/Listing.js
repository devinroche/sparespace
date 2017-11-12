import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"

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

		return (
			<div className="text-center" style={{ marginTop: 100 }}>
				<h3>Title: {listing.title}</h3>
				<h3>Price: {listing.price}</h3>
				<h3>Description: {listing.description}</h3>
				{/* {this.state.listing.images.map((l, i) => (
					console.log(l)
					// <Image cloudName="dopxmkhbr" publicId={l} width="200"/>
                ))
                } */}
			</div>
		)
	}
}

export default LoggedIn
