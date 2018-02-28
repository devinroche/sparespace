import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import Cookies from "../../Cookies"
import SubMap from '../ListingMap'
import SendMessage from './SendMessage'
import Carousel from 'nuka-carousel'
import moment from 'moment';
import { CardStyle, CardHost, CardTitle, Description, Price, Features, ListingLabel, Label, Duration } from "../Styles";
import {ClimbingBoxLoader } from 'react-spinners'

class ListingDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            expressInterest: true,
            listingImages: [],
            listing: [],
            l: '',
            features: [],
            loading: true // loading icon state 
        }

        this.canExpress = this.canExpress.bind(this)
        this.canClick = this.canClick.bind(this)
        this.renderInterest = this.renderInterest.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/listing/${this.props.match.params.id}`)
            .then(res => {
                
                this.setState({
                    listingImages: res.data.images,
                    listing: res.data,
                    features: res.data.features,
                    loading: false // stop loading icon 
                })
                this.canExpress(res.data._host._id, res.data.interested)
            })
    }

    renderInterest(l_id, h_id) {
        return <SendMessage host={h_id} renter={Cookies.getId()} callback={this.canClick} />

    }

    canExpress(host, interested) {
        if (Cookies.getId() === host)
            this.setState({ expressInterest: false })

    }

    canClick() {
        this.setState({ expressInterest: false })
    }

    render() {

        const listing = this.state.listing ? this.state.listing : "";
        const lid = listing._id ? listing._id : "";
        const hid = listing._host ? listing._host._id : "";
        const host = listing._host ? listing._host : "";
        const dates = listing.dates ? listing.dates : "";
        const startDate = moment(dates[0]).format("MM/DD/YYYY");
        const endDate = moment(dates[1]).format("MM/DD/YYYY");

        const { loading } = this.state; // variable for loading icon 
        if (loading) { // if component is loading add loader icon
            return (
                <div className='mx-auto' style={{ width: '200px' }} >
                    <ClimbingBoxLoader
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
            ); // render null when app is not ready
        }
        return (

            <div className="container">
                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-sm-8 col-lg-9" >
                        <CardStyle>
                            <Carousel>
                                {this.state.listingImages.map((l, index) => (
                                    <Image key={index} cloudName="dopxmkhbr" publicId={l} />
                                ))
                                }
                            </Carousel>
                            <div>
                                <CardTitle>{listing.title}</CardTitle>
                                <CardHost>{host.first}</CardHost>
                            </div>
                        </CardStyle>
                        <div className="row">
                            <ListingLabel>Features</ListingLabel>
                            {
                                this.state.features.length
                                    ?
                                    <ul className="list-inline">
                                        {
                                            this.state.features.map((l, index) => (
                                                <Features>
                                                    <span style={{ color: "#FC5B45" }}>&bull; &nbsp;</span>{l}</Features>
                                            ))
                                        }
                                    </ul>
                                    :
                                    <h1>This space has no features</h1>
                            }
                        </div>
                        <div className="row">
                            <ListingLabel>Description</ListingLabel>
                            <Description>{listing.description}</Description>
                        </div>
                    </div>


                    <div className="col-sm-4 col-lg-3">
                        <SubMap l={listing} />
                        <div className="row">
                            <div className="col-sm-11 col-sm-offset-1">
                                <Label>Price</Label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-2 col-sm-offset-1">
                                <Price>${listing.price}/mo</Price>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-11 col-sm-offset-1">
                                <Label>Available</Label>
                                <Duration>{startDate}  &nbsp; -> &nbsp; {endDate}</Duration>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-11 col-sm-offset-1">
                                <Label>Size</Label>
                                <Duration>{listing.size}</Duration>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-11 col-sm-offset-1">
                                {this.state.expressInterest ? this.renderInterest(lid, hid) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListingDetails








