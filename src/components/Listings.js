import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"

let publicId = ""

class Listings extends React.Component {
	constructor() {
		super()
		this.state = {
			listings: []
		}
	}

	componentDidMount() {
		axios
			.get("http://localhost:3001/listings")
			.then(response => {
				this.setState({
					listings: response.data
				})
			})
			.catch(function(error) {
				console.log(error)
			})
	}

	render() {
		console.log(this.state.listings)

		return (
			<div>
				<div className="container" style={{ background: "transparent" }}>
					<div
						className="card"
						style={{ marginTop: "250px", width: "20rem", border: "solid" }}
					>
						<img className="card-img-top" src="" alt="Card image cap" />
						<Image cloudName="dopxmkhbr" publicId={publicId} width="200" />
						<div className="card-block">
							<h4 className="card-title">{this.state.listings.title}</h4>
							<p className="card-text">{this.state.listings.description}</p>
							<p className="card-text">{this.state.listings.price}</p>
							<a className="btn btn-primary">Go somewhere</a>
						</div>

						<ul>
							{this.state.listings.map(function(l, index) {
								return <li key={index}>{l.title}</li>
							})}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Listings
