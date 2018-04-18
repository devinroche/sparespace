import React, { Component } from "react"
import CreateListingDetails from "../CreateListing/CreateListingDetails"
import CreateListingDetails1 from "../CreateListing/CreateListingDetails1"
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './create_listing.css';
import LoginAlert from "../Alerts/LoggedIn"
import moment from "moment"
var F = require('bad-words');
var Filter = new F();

class CreateListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           page_basics: true, // determines which page view
           page_details: false,
           page_photos: false,
           title: "",
           description:"Why should people rent out your space? Any special features? Is it being shared with anyone else? What could fit in this space?",
           price:"",
           features: [],
           address: "Gonzaga University, East Boone Avenue, Spokane, WA, USA",
           size: "",
           Lat_Lng: {lat: 47.667189, lng: -117.40238490000002},
           duration: {
               start: new Date().toISOString(),
               end: new Date().toISOString()
           },
           titleE: false, // if no input title field
           descriptionE:false,
           priceE:false,
           addressE:false,
           sizeE:false,
           
        };
        this.handleContinue = this.handleContinue.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)   
        this.handleAddressChange = this.handleAddressChange.bind(this)     
        this.handleSubmit = this.handleSubmit.bind(this)

        this.handleTitleChange = this.handleTitleChange.bind(this);
        

    }   
    //form change functions
    handleTitleChange = e => this.setState({title:e.target.value});   
    handleDescriptionChange = e => this.setState({description: e.target.value});
    handlePriceChange = e => this.setState({price: e.target.value});
    handleFeatureChange = e => this.setState({features: e});
    handleSizeChange = e  => this.setState({size:e});
    handleStartChange = e => this.setState({
        duration: {start: moment(e)._d.toISOString(),end:moment(e)._d.toISOString()}
    })
    handleEndChange = e => this.setState({
        duration: {start: this.state.duration.start,end:moment(e)._d.toISOString()}
    })
    // handles address change and upload of lat lng every time address is changed
    handleAddressChange  (e) {
        this.setState({address:e});
        geocodeByAddress(e)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({Lat_Lng:latLng,addressE:false}))
        .catch(error => this.setState({addressE:true}))
    } 


    componentDidMount() {
        
        this.checkLogin()
    }

    checkLogin() {
        if (!Cookies.isLoggedIn()) {
            return 'log'
        }
    }
    
    

    /*
    Function: handle page change forward
    Description: Gets sent to create listing forms 
        - activates when continue button is pressed
    */

    handleContinue() {
        
        
        if (this.state.page_basics == true) { // on property basics page
            if (Filter.list.indexOf(this.state.title) != -1) {
                this.setState({titleE:true})
                return; 
            }
            if (this.state.title == "") {
            this.setState({titleE:true})
            return;
            }
            if (this.state.description == "") {
            this.setState({descriptionE:true})
            return;
            }
            if (this.state.price == "") {
            this.setState({priceE:true})
            return;
            }
            
            this.setState({
                page_basics:false,
                page_details:true,
                titleE:false,
                descriptionE:false,
                priceE:false
            });
        } else { // going to property details page
            if (this.state.addressE == true) {
                return;
            }
            if (this.state.size == "") {
                this.setState({sizeE:true})
                return;
            }
                this.setState({
                    page_details:false,
                    page_photos:true,
                    sizeE:false
                });
            }  
    }

    /*
    Function: handle page change backward
    Description: Gets sent to create listing forms 
        - activates when back button is pressed
    */

    handleBack() {
        if (this.state.page_details == true) { // on property details page
            this.setState({
                page_basics:true,
                page_details:false
            });
        } else { // going to property details page
                this.setState({
                    page_details:true,
                    page_photos:false
                });
            } 
    }

    /*
    Function: handle submit data
    Description: Gets sent to create listing last form (iamge upload)
        - activates when submit button is pressed
    */

   handleSubmit(arr) {

       
        let storageObj = {
            _host: Cookies.getId(),
            title: this.state.title,
            price: Number(this.state.price),
            description: this.state.description,
            dates: [this.state.duration.start, this.state.duration.end],
            location: this.state.address,
            lat:this.state.Lat_Lng.lat,// this.state.latlng.lat,
            lng: this.state.Lat_Lng.lng,// this.state.latlng.lng,
            features: this.state.features,
            size: this.state.size,
            images: arr
        };

        axios.post('https://s-services.herokuapp.com/listings', storageObj)
            .then(response => {
                swal(
                    'Check our your listing!',
                    'You will receive an email if someone messages you about your space!',
                    'success'
                    ).then((value) => {
                        postSpace(storageObj)
                        window.location.href = "/listing/" + response.data._id
                        return <Redirect to={"/listing/" + response.data._id}/>
                    });
            })
        
    }

        
    

    

    

    render() {
        if (this.checkLogin() === 'log'){
            return <LoginAlert />
        }

        return (
            <div className="container">
                {
                    this.state.page_basics === false ? null  : // determine current page
                        <CreateListingDetails
                        titleE = {this.state.titleE} 
                        descriptionE = {this.state.descriptionE}
                        priceE = {this.state.priceE}
                        title = {this.state.title}
                        description = {this.state.description}
                        price = {this.state.price}
                        handleContinue = {this.handleContinue}
                        handleBack = {this.handleBack}
                        handleTitleChange = {this.handleTitleChange}
                        handleDescriptionChange = {this.handleDescriptionChange}
                        handlePriceChange = {this.handlePriceChange}
                        />
                }
                {
                    this.state.page_details === false ? null  : // determine current page
                        <CreateListingDetails1 
                        sizeE = {this.state.sizeE}
                        addressE = {this.state.addressE}
                        features = {this.state.features}
                        size = {this.state.size}
                        duration = {this.state.duration}
                        address = {this.state.address}
                        handleContinue = {this.handleContinue}
                        handleBack = {this.handleBack}
                        handleFeatureChange = {this.handleFeatureChange}
                        handleSizeChange = {this.handleSizeChange}
                        handleStartChange = {this.handleStartChange}
                        handleEndChange = {this.handleEndChange}
                        handleAddressChange = {this.handleAddressChange}
                        />
                }
                {
                    this.state.page_photos === false ? null  : // determine current page
                        <ImageUpload
                        handleBack = {this.handleBack}
                        handleSubmit = {this.handleSubmit}
                        />
                }
                
            </div>
        );
    }
}

export default CreateListingPage;






