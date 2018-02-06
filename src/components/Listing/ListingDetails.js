import React from "react"
import axios from "axios"
import { Image, Transformation } from "cloudinary-react"
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
			l: '',
			features: []
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
                 this.setState({ listingImages: res.data.images,
				 				 listing: res.data,
				 				 features: res.data.features})
                 this.canExpress(res.data._host._id, res.data.interested)
             }).catch(err => console.log("some err occured", err))

    }

	render() {

		const listing = this.state.listing ? this.state.listing : ""
		const lid = listing._id ? listing._id : ""
		const hid = listing._host ? listing._host._id : ""
		const host = listing._host ? listing._host : "";

        const styles = {
            cardStyle : {
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            },

			imageSize : {
            	width: 700,
				height: 200
			},

            mainStyle : {
                fontFamily: "Rubik",
                color: "#333",
				fontWeight: "600",
				marginLeft: 15,
				fontSize: 25
            },

            secondStyle : {
                fontFamily: "Rubik",
                color: "#7F7F7F",
				marginLeft: 15,
				fontSize: 17
            },

            priceStyle : {
                fontFamily : "Rubik",
                color: "#333",
                fontWeight: "700",
				marginTop: 350
            },

            monthStyle : {
                fontFamily : "Rubik",
                color: "#666",
                fontWeight: "400",
                marginTop: 350
            },

			durationStyle : {
                fontFamily : "Rubik",
                color: "#666",
                fontWeight: "300",
                marginTop: 350
			},

			descriptionStyle : {
            	fontFamily: "Rubik",
            	color: "#818181",
				lineHeight: 2,
				fontSize: 15

			},

			descriptionLabel : {
            	fontFamily: "Rubik",
				color: "#333",
				marginTop: 50,
                fontWeight: "400",
                fontSize: 20
			},

			featuresLabel : {
                fontFamily: "Rubik",
                color: "#333",
                marginTop: 50,
				fontWeight: "400",
				fontSize: 20
			},

			featuresStyle : {
                fontFamily: "Rubik",
				color: "#666666",
				marginTop: 10,
				fontSize: 18,
				marginLeft: 10
            }



        };

		return (

			<div className="container">
					<div className="col-sm-8 offset-sm-4 text-center" style={{ marginTop: 50}}>
						<div className="card row" style={styles.cardStyle}>
							<Carousel>
								{this.state.listingImages.map((l, index) => (
                                    <Image cloudName="dopxmkhbr" publicId={l} height="100" width="500">
                                        <Transformation width="550" crop="scale" />
									</Image>
                                ))
                                }
							</Carousel>
							<div className="card-block">
								<h2 style={styles.mainStyle} className="card-title text-left">{listing.title}</h2>
								<h4 style={styles.secondStyle} className="card-text text-left">{host.first}</h4>
							</div>
						</div>

                        <div className="row">
                            <h4 className="text-left" style={styles.featuresLabel}>Features</h4>
							<ul className="list-inline">
								{
									this.state.features.map((l, index) => (
									<li className="list-inline-item pull-left" style={styles.featuresStyle}>
										<span style={{color: "#FC5B45"}}>&bull;</span> {l}</li>
									))
								}
							</ul>
                        </div>

						<div className="row">
							<h4 className="text-left" style={styles.descriptionLabel}>Description</h4>
							<p className="text-left" style={styles.descriptionStyle}>{listing.description}</p>
						</div>
					</div>

					<div className="col-sm-3 text-center" style={{marginTop: 50, marginLeft: 25}}>
                        <SubMap l={this.state.listing} />
						<h3 className="pull-left" style={styles.priceStyle}>${listing.price}</h3>
						<h3 className="pull-left" style={styles.monthStyle}>/mo</h3>
                        <h3 className="pull-right" style={styles.durationStyle}>{listing.duration} months</h3>

						{
                                this.state.expressInterest ? this.renderInterest(lid, hid) : ""
                            }
					</div>

				</div>
		)
	}
}

export default ListingDetails
