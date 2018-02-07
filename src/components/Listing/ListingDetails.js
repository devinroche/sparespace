import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import Cookies from "../../Cookies"
import SubMap from '../ListingMap'
import SendMessage from './SendMessage'
import Carousel from 'nuka-carousel'

class ListingDetails extends React.Component {
	constructor() {
		super()
		this.state = {
            expressInterest: true,
			listingImages : [],
			listing: [],
			l: ''
		}

		this.canExpress = this.canExpress.bind(this)
        this.canClick = this.canClick.bind(this)
        this.renderInterest = this.renderInterest.bind(this)
        this.getListingInfo = this.getListingInfo.bind(this)
    }

    componentDidMount() {
		this.getListingInfo()
	}

    renderInterest(l_id, h_id){
        return <SendMessage host={h_id} renter={Cookies.getId()}  callback={this.canClick}/>
          
    }

	canExpress(host, interested){
		if(Cookies.getId() === host)
            this.setState({expressInterest: false})

		if(interested.includes(Cookies.getId()))
            this.setState({expressInterest: false})
	}

	canClick(){
		this.setState({expressInterest: false})
		this.forceUpdate();
	}

	 getListingInfo(){

         axios.get(`http://localhost:3001/listing/${this.props.match.params.id}`)
             .then(res => {
                 this.setState({ listingImages: res.data.images, listing: res.data })
                 this.canExpress(res.data._host._id, res.data.interested)
             }).catch(err => console.log("some err occured", err))

    }

	render() {

		const listing = this.state.listing ? this.state.listing : ""
		const lid = listing._id ? listing._id : ""
		const hid = listing._host ? listing._host._id : ""

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
					<div className="col-sm-6 text-center col-sm-offset-3" style={{ marginTop: 50}}>
						<div className="card row" style={styles.cardStyle}>
							<Carousel>
								{this.state.listingImages.map((l, index) => (
                                <Image cloudName="dopxmkhbr" publicId={l} height="300" width="500" style={{}}/>
                                ))
                                }
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
                        <SubMap l={this.state.listing} />
						<h3 style={styles.priceStyle}>${listing.price}</h3>
                            { 
                                this.state.expressInterest ? this.renderInterest(lid, hid) : ""
                            }
					</div>

				</div>
		)
	}
}

export default ListingDetails
