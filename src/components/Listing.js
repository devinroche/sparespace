import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import Cookies from "../Cookies"
import swal from "sweetalert"
import Interest from './Interest'

class LoggedIn extends React.Component {
	constructor() {
		super()
		this.state = {
			isHost: false
		}

		this.canExpress = this.canExpress.bind(this)
		this.canClick = this.canClick.bind(this)
	}

	componentDidMount() {
		axios.get(`http://localhost:3001/listing/${this.props.match.params.id}`)
			.then(res => {
				this.setState({ listing: res.data })
				this.canExpress(res.data._host, res.data.interested)
			})
			.catch(err => console.log("some err occured", err))

	}

	canExpress(host, interested){
		if(Cookies.getId() === host)
			this.setState({isHost: true})

		if(interested.includes(Cookies.getId()))
			this.setState({isHost: true})
	}

	canClick(){
		this.setState({isHost: true})
		this.forceUpdate();
	}

	render() {
		const listing = this.state.listing ? this.state.listing : ""
		const listingImages = listing.images ? listing.images: ""

		return (
			<div className="text-center" style={{ marginTop: 100 }}>
				<Image cloudName="dopxmkhbr" publicId={listingImages[0]} width="400"/>
				<h3>Title: {listing.title}</h3>
				<h3>Price: {listing.price}</h3>
				<h3>Description: {listing.description}</h3>
				<br/>
				<br/>
				{ !this.state.isHost ? 
					<Interest listing={listing._id} host={listing._host} renter={Cookies.getId()}  callback={this.canClick}/> 
					: null 
				}
			</div>
		)
	}
}

export default LoggedIn
