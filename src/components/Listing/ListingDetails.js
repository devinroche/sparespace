import React from "react"
import axios from "axios"
import { Image,Transformation } from "cloudinary-react"
import Cookies from "../../Cookies"
import SubMap from '../ListingMap'
import SendMessage from './SendMessage'
import moment from 'moment';
import { CardStyle, CardHost, CardTitle, Description, Price, Features, ListingLabel, Label, Duration } from "../Styles";
import {ClimbingBoxLoader } from 'react-spinners'
import { Carousel } from 'react-bootstrap';
import swal from 'sweetalert2'
import './Listing.css';



class ListingDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            expressInterest: true,
            listingImages: [],
            listing: [],
            l: '',
            features: [],
            loading: true, // loading icon state,
            reportMessage:"" 
        }

        this.canExpress = this.canExpress.bind(this)
        this.renderInterest = this.renderInterest.bind(this)
        this.CreateReport = this.CreateReport.bind(this)
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
                this.canExpress(res.data._host._id)
            })
    }
    // pops up a "sweet alert" 
    /*
    Tells the user input a phrase as to why the listing
    should be flagged as innapropriate
    */
    CreateReport() {
        swal({
            title: 'Why are you reporting this Post?',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            
            allowOutsideClick: () => !swal.isLoading()
          }).then((result) => {
            if (result.value) {
              swal({
                type: 'success',
                title: 'Thank you for your input!',
              })
              //console.log(result.value)
              axios.post("http://localhost:3001/report",{
                  message: result.value,
                  id:this.props.match.params.id
              })
            }
          })
    }

    renderInterest(l_id, h_id) {
        return <SendMessage host={h_id} renter={Cookies.getId()} />

    }

    canExpress(host) {
        if (Cookies.getId() === host || !Cookies.getId())
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
                <div className='loading' >
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
                        <Carousel className ="carousel">
                            {this.state.listingImages.map((l, index) => (

                                <Carousel.Item className = "peopleCarouselImg" >
                                    <img alt="900x500" key={index} src={this.state.listingImages[index]}/>
                                </Carousel.Item>
                            ))}        
                        </Carousel>
                            
                                <div>
                                    <CardTitle>{listing.title}</CardTitle>
                                    <CardHost>Size: {listing.size}</CardHost>
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
                                    <Description>This space has no features</Description>
                            }
                        </div>
                        <div className="row">
                            <ListingLabel>Description</ListingLabel>
                            <Description style={{whiteSpace: 'pre-line'}} >{listing.description}</Description> 
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
                                {this.state.expressInterest ? <SendMessage host={hid} renter={Cookies.getId()} /> : ""}
                            </div>
                            <a 
                            className = "col-sm-11 col-sm-offset-1"
                            onClick = {this.CreateReport}
                            >
                            Report Listing
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ListingDetails








