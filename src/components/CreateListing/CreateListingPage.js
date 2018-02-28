import React, { Component } from "react"
import CreateListing from "../CreateListing/CreateListing"
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class CreateListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            price: "",
            location: "",
            features: [],
            size: "",
            dates: {
                start: null,
                end: null
            },
            pageChange: false,
            filePaths: []
        };
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleListingCreate = this.handleListingCreate.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)


    }   

    
    //handle form change from create listing form
    //allow saving of inputs for back button 
    /*
    inputs: t - title
            d - description
            p - price
            l - location
            f - features
            datez - dates
    */
    handleFormChange(t,d,p,l,f,s,datez) {
        
        
        this.setState({
            title: t,
            description:d,
            price:p,
            location: l,
            features: f,
            size: s,
            dates: datez
        })
    }
    //form to manage photos being added to 
    //image upload lineup 
    handleImageChange(files) {
        this.setState({
            filePaths:files
        })
    }

    //Function to handle changing of page
    // initiated by press of continue or back button 
    // inputs - 1 - create listing page
    //            0 - image upload page
    handlePageChange(page) {        
        if (page === 0) { // if continue button is pressed
            this.setState({pageChange:true})
        } else { // if back button is pressed
            this.setState({pageChange:false})
        }
        
    }

    componentDidMount() {
        
    }
    //When finish button in image upload is pressed 
    handleListingCreate(urls) {
            // geocode address and put in object
            // only when user is sure about their address
            geocodeByAddress(this.state.location)
                .then(results => getLatLng(results[0]))
                .then(latLng => {
                    
                    let storageObj = {
                        _host: Cookies.getId(),
                        title: this.state.title,
                        price: Number(this.state.price),
                        description: this.state.description,
                        dates: [this.state.dates.start, this.state.dates.end],
                        location: this.state.location,
                        lat:latLng.lat,// this.state.latlng.lat,
                        lng: latLng.lng,// this.state.latlng.lng,
                        features: this.state.features,
                        size: this.state.size,
                        images: urls
                    };
                    axios.post('http://localhost:3001/listings', storageObj)
                                    .then(response => {
                                        swal(
                                            'Good job!',
                                            'Check out your listing!',
                                            'success'
                                            ).then((value) => {
                                                postSpace(storageObj)
                                                window.location.href = "/listing/" + response.data._id
                                                return <Redirect to={"/listing/" + response.data._id}/>
                                            });
                                    })
                                

                })
                .catch(error => console.error('Error', error))

            
            

            
    }

    

    

    render() {
        return (
            <div className="container">
                {
                    // if pageChange = false then show create listing page
                    this.state.pageChange === true ? null :
                        <CreateListing 
                        onPageChange = {this.handlePageChange} 
                        onFormChange = {this.handleFormChange} 
                        title = {this.state.title}
                        description = {this.state.description}
                        price = {this.state.price}
                        address = {this.state.location}
                        features = {this.state.features}
                        size = {this.state.size}
                        dates = {this.state.dates}/>
                }
                { // if pagechange = true then show image upload page 
                    this.state.pageChange === false ? null :
                        <ImageUpload 
                        onPageChange = {this.handlePageChange}
                        onImageChange = {this.handleImageChange}
                        onListingCreate = {this.handleListingCreate}
                        />
                }
            </div>
        );
    }
}

export default CreateListingPage;



/*
Move upload of everything to Create listing page and have a listener for when the user
presses the continue button 

- user fills out creat listing
- user goes to image upload
- user goes back 
    - user edits

we either need to pass in as props or upload from main page 
we need to grab from image upload

*/


