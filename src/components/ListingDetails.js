import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import Cookies from "../Cookies"
import swal from "sweetalert"
import Interest from './Interest'
import Carousel from 'nuka-carousel'

class ListingDetails extends React.Component {
	constructor() {
		super()
		this.state = {
			isHost: false,
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

        const styles = {

            cardStyle : {
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
            },

            imageSize : {
                width: 250,
                height: 200
            },

            mainStyle : {
                fontFamily: "Roboto",
                color: "#333",
				marginLeft: 15
            },

            secondStyle : {
                fontFamily: "Roboto",
                color: "#7F7F7F",
				marginLeft: 15
            },

            priceStyle : {
                fontFamily : "Roboto",
                color: "#333",
                fontWeight: "bold",
				marginTop: 250
            },

			descriptionStyle : {
            	fontFamily: "Roboto",
            	color: "#4B4B4B",
				lineHeight: 2,

			},

			descriptionHeaderStyle : {
            	fontFamily: "Roboto",
				color: "#333",
				marginTop: 50
			}

        }


		return (

			<div className="container">
					<div className="col-sm-2">
					</div>

					<div className="col-sm-7 text-center" style={{ marginTop: 50}}>
						<div className="card row" style={styles.cardStyle}>
							<Carousel>
								{/*{*/}
                                    {/*listingImages.map((l, index) => (*/}
										{/*<Image cloudName="dopxmkhbr" publicId={l[index]} height="300" width="500" style={{}}/>*/}
                                    {/*))*/}
								{/*}*/}

                                <Image cloudName="dopxmkhbr" publicId={listingImages[0]} height="300" width="500" style={{}}/>
                                <Image cloudName="dopxmkhbr" publicId={listingImages[1]} height="300" width="500" style={{}}/>
								<Image cloudName="dopxmkhbr" publicId={listingImages[2]} height="300" width="500" style={{}}/>

							</Carousel>
							<div className="card-block">
								<h2 style={styles.mainStyle} className="card-title text-left">{listing.title}</h2>
								<h4 style={styles.secondStyle} className="card-text text-left">{listing.location}</h4>
							</div>
						</div>
						<div className="row">
							<h4 className="text-left" style={styles.descriptionHeaderStyle}>Description</h4>
							<p className="text-left" style={styles.descriptionStyle}>{listing.description}</p>
						</div>
					</div>

					<div className="col-sm-3 text-center">
						<h3 style={styles.priceStyle}>${listing.price}</h3>
                        { !this.state.isHost ?
							<Interest listing={listing._id} host={listing._host} renter={Cookies.getId()}  callback={this.canClick}/>
                            : null
                        }
					</div>

				</div>
		)
	}
}

export default ListingDetails
